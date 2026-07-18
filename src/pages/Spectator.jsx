import { useState, useRef, useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import {
    Play,
    Eye,
    Users,
    Wifi,
    Star,
    MapPin,
    TrendingUp,
    Volume2,
    Maximize2,
    Radio,
    MessageSquare,
    Send,
    Flame,
    Clock,
    Trophy,
    ChevronRight,
    Signal,
    Link as LinkIcon,
    MonitorOff
} from "lucide-react";

const extractYoutubeId = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([^&?/\s]+)/);
    return match ? match[1] : url;
};

const FAN_REACTIONS = [];

function Spectator() {
    const [chatMsg, setChatMsg] = useState("");
    const [reactions, setReactions] = useState(FAN_REACTIONS);
    
    const [liveRaces, setLiveRaces] = useState([]);
    const [upcomingRaces, setUpcomingRaces] = useState([]);
    const [selectedStream, setSelectedStream] = useState(null);

    const [editingLink, setEditingLink] = useState(false);
    const [tempLink, setTempLink] = useState("");
    const [linkError, setLinkError] = useState("");
    const [chatMode, setChatMode] = useState("youtube");
    const [standaloneYoutubeId, setStandaloneYoutubeId] = useState(() => localStorage.getItem("spectatorStandaloneYoutubeId") || "");
    
    // Use auth context if you have it to get userId, else mock it
    const { user } = useAuth ? useAuth() : { user: null };
    const isAdmin = user?.role?.toLowerCase() === "admin";
    const canManageYoutubeLink = isAdmin;

    const chatEndRef = useRef(null);
    const hubConnection = useRef(null);

    // Auto-scroll chat
    useEffect(() => {
        if (chatMode === "app" && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [reactions, chatMode]);

    // Fetch active streams on mount
    useEffect(() => {
        const fetchStreams = async () => {
            try {
                const res = await axiosClient.get("/Races/streams/active");
                const data = res.data;
                const liveStatuses = ["LIVE", "STARTED", "ONGOING", "RACING"];
                const upcomingStatuses = [
                    "UPCOMING",
                    "OPEN REGISTRATION",
                    "REGISTRATION CLOSED",
                    "READY TO START"
                ];
                const lives = data.filter(r => liveStatuses.includes(r.status?.toUpperCase()));
                const upcomings = data.filter(r => upcomingStatuses.includes(r.status?.toUpperCase()));
                
                // Map properties to match UI expectations
                const mapRace = r => ({
                    ...r,
                    race: r.raceName,
                    tournamentName: r.tournamentName || "Uncategorized"
                });

                setLiveRaces(lives.map(mapRace));
                setUpcomingRaces(upcomings.map(mapRace));
                
                if (lives.length > 0) setSelectedStream(mapRace(lives[0]));
                else if (upcomings.length > 0) setSelectedStream(mapRace(upcomings[0]));
                else if (data.length > 0) setSelectedStream(mapRace(data[0])); // Fallback to first race
                else setSelectedStream(null);
            } catch (err) {
                console.error("Failed to fetch streams", err);
                setSelectedStream(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStreams();
    }, []);

    // Load comments and connect SignalR when stream changes
    useEffect(() => {
        if (!selectedStream?.raceId) return;

        const loadCommentsAndConnect = async () => {
            try {
                const res = await axiosClient.get(`/Races/${selectedStream.raceId}/comments`);
                setReactions(res.data);
            } catch (err) {
                console.error("Failed to fetch comments", err);
            }

            if (hubConnection.current) {
                await hubConnection.current.stop();
            }

            const connection = new signalR.HubConnectionBuilder()
                .withUrl(import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace("/api", "/chatHub") : "https://localhost:7179/chatHub")
                .withAutomaticReconnect()
                .build();

            connection.on("ReceiveMessage", (msg) => {
                setReactions(prev => [...prev, msg]);
            });

            try {
                await connection.start();
                await connection.invoke("JoinRaceGroup", selectedStream.raceId.toString());
                hubConnection.current = connection;
            } catch (err) {
                console.error("SignalR Connection Error: ", err);
            }
        };

        loadCommentsAndConnect();

        return () => {
            if (hubConnection.current) {
                hubConnection.current.invoke("LeaveRaceGroup", selectedStream.raceId.toString())
                    .then(() => hubConnection.current.stop())
                    .catch(err => console.error(err));
            }
        };
    }, [selectedStream?.raceId]);

    const handleUpdateLink = async () => {
        if (!tempLink.trim() || !selectedStream) return;
        const newId = extractYoutubeId(tempLink);

        if (!/^[a-zA-Z0-9_-]{11}$/.test(newId)) {
            setLinkError("Invalid YouTube link or video ID.");
            return;
        }

        setLinkError("");

        if (!selectedStream.raceId) return;
        
        try {
            await axiosClient.put(`/Races/${selectedStream.raceId}/youtube-id`, `"${newId}"`, {
                headers: { "Content-Type": "application/json" }
            });
            
            if (["LIVE", "STARTED", "ONGOING", "RACING"].includes(selectedStream.status?.toUpperCase())) {
                const updated = liveRaces.map(r => r.raceId === selectedStream.raceId ? { ...r, youtubeId: newId } : r);
                setLiveRaces(updated);
            } else {
                const updated = upcomingRaces.map(r => r.raceId === selectedStream.raceId ? { ...r, youtubeId: newId } : r);
                setUpcomingRaces(updated);
            }
            
            setSelectedStream({ ...selectedStream, youtubeId: newId });
            setEditingLink(false);
            setTempLink("");
            setChatMode("youtube");
        } catch (err) {
            console.error("Failed to update youtube link", err);
            setLinkError(err.response?.data?.message || "Unable to save the YouTube link.");
        }
    };

    const handleStandaloneLink = () => {
        const newId = extractYoutubeId(tempLink.trim());
        if (!/^[a-zA-Z0-9_-]{11}$/.test(newId)) {
            setLinkError("Invalid YouTube link or video ID.");
            return;
        }

        localStorage.setItem("spectatorStandaloneYoutubeId", newId);
        setStandaloneYoutubeId(newId);
        setTempLink("");
        setLinkError("");
        setEditingLink(false);
    };

    const handleSend = async () => {
        if (!chatMsg.trim() || !selectedStream) return;

        if (!hubConnection.current) return;
        
        try {
            // Use real userId if available, else 1 for testing (requires a valid user in DB)
            const userId = parseInt(user?.id) || 1; 
            await hubConnection.current.invoke("SendMessage", selectedStream.raceId.toString(), userId, chatMsg);
            setChatMsg("");
        } catch (err) {
            console.error(err);
        }
    };

    const [isLoading, setIsLoading] = useState(true);

    if (isLoading && !selectedStream) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zinc-500"></div>
            </div>
        );
    }

    if (!selectedStream) {
        return (
                <div className="pb-12">
                    <div className="relative mb-6 overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 px-6 py-8 shadow-2xl md:px-10">
                        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
                        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-amber-400">
                                    <Radio className="h-3.5 w-3.5" /> Race Broadcast Center
                                </div>
                                <h1 className="text-4xl font-black tracking-tight text-white">Live Stream <span className="text-amber-400">Preview</span></h1>
                                <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-zinc-400">Watch the current YouTube broadcast and join the live conversation.</p>
                            </div>
                            {isAdmin && !editingLink && (
                                <button onClick={() => { setTempLink(standaloneYoutubeId); setLinkError(""); setEditingLink(true); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-amber-500">
                                    <LinkIcon className="h-4 w-4" /> {standaloneYoutubeId ? "Change YouTube Link" : "Set YouTube Link"}
                                </button>
                            )}
                        </div>
                    </div>

                    {isAdmin && editingLink && (
                        <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                            <div className="flex flex-col gap-3 md:flex-row">
                                <input value={tempLink} onChange={event => { setTempLink(event.target.value); setLinkError(""); }} onKeyDown={event => event.key === "Enter" && handleStandaloneLink()} placeholder="Paste a YouTube link or video ID..." className="min-w-0 flex-1 rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" />
                                <button onClick={handleStandaloneLink} className="rounded-xl bg-zinc-950 px-5 py-3 text-sm font-black text-white hover:bg-zinc-800">Save Link</button>
                                <button onClick={() => { setEditingLink(false); setLinkError(""); }} className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-black text-zinc-600 hover:bg-zinc-50">Cancel</button>
                            </div>
                            {linkError && <p className="mt-2 text-xs font-semibold text-red-500">{linkError}</p>}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm xl:col-span-2">
                            <div className="relative aspect-video bg-zinc-950">
                                {standaloneYoutubeId ? (
                                    <iframe className="absolute inset-0 h-full w-full" src={`https://www.youtube.com/embed/${standaloneYoutubeId}?autoplay=1&mute=1`} title="YouTube broadcast preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                                ) : (
                                    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5"><Play className="h-8 w-8 text-zinc-500" /></div>
                                        <h2 className="text-xl font-black text-white">No YouTube Link Attached</h2>
                                        <p className="mt-2 max-w-sm text-sm text-zinc-500">Set a YouTube link to preview the broadcast here.</p>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center justify-between gap-4 p-5">
                                <div><p className="font-black text-zinc-900">Live Broadcast</p><p className="mt-1 text-xs font-medium text-zinc-500">YouTube stream provided by the race administrator.</p></div>
                                {standaloneYoutubeId && <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-600">Link Ready</span>}
                            </div>
                        </div>

                        <div className="min-h-[480px] overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
                            <div className="border-b border-zinc-100 p-5"><h2 className="flex items-center gap-2 font-black text-zinc-900"><MessageSquare className="h-5 w-5 text-red-500" /> YouTube Live Chat</h2><p className="mt-1 text-xs text-zinc-500">Available only when Live Chat is enabled on YouTube.</p></div>
                            <div className="relative h-[410px] bg-zinc-50">
                                {standaloneYoutubeId ? <iframe src={`https://www.youtube.com/live_chat?v=${standaloneYoutubeId}&embed_domain=${window.location.hostname}`} title="YouTube live chat" className="absolute inset-0 h-full w-full border-0" /> : <div className="flex h-full flex-col items-center justify-center p-6 text-center text-zinc-400"><MessageSquare className="mb-3 h-10 w-10 opacity-20" /><p className="text-sm font-medium">Live Chat will appear after a link is attached.</p></div>}
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

    // Helper to group races by tournament
    const groupRacesByTournament = (races) => {
        return races.reduce((groups, race) => {
            const tour = race.tournamentName || "Uncategorized";
            if (!groups[tour]) groups[tour] = [];
            groups[tour].push(race);
            return groups;
        }, {});
    };

    return (
        <div className="pb-12">
            {/* ═══════ HERO HEADER ═══════ */}
            <div className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-950 to-zinc-900 rounded-3xl p-8 mb-10 border border-zinc-800/60 shadow-xl">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/8 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-64 bg-blue-500/5 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                            </span>
                            Race Broadcast Center
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                            Spectator <span className="text-amber-400">Arena</span>
                        </h1>
                        <p className="text-zinc-400 text-base max-w-md">
                            Watch live race broadcasts, follow real-time standings, and engage with the global racing community.
                        </p>
                    </div>

                </div>
            </div>

            {/* ═══════ MAIN CONTENT GRID ═══════ */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* ── LEFT: Main stream + live races list ── */}
                <div className="xl:col-span-2 space-y-6">
                    {/* VIDEO PLAYER */}
                    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                        {/* Video area */}
                        <div className="relative bg-zinc-950 aspect-video w-full overflow-hidden">
                            {selectedStream.youtubeId ? (
                                <iframe
                                    className="absolute top-0 left-0 w-full h-full z-10"
                                    src={`https://www.youtube.com/embed/${selectedStream.youtubeId}?autoplay=1&mute=1`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <>
                                    {/* Background decoration */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
                                    <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl" />
                                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl" />

                                    {/* Center play area */}
                                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                                        <button className="group w-20 h-20 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center mb-5 transition-all hover:scale-110">
                                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                                        </button>
                                        <p className="text-white font-black text-2xl mb-1">{selectedStream.race}</p>
                                        <p className="text-zinc-400 text-sm flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {selectedStream.track}
                                        </p>
                                    </div>
                                    
                                    {/* Controls overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl text-white transition-colors pointer-events-auto">
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl text-white transition-colors pointer-events-auto">
                                                <Signal className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button className="p-2 bg-black/40 backdrop-blur-sm hover:bg-black/60 border border-white/10 rounded-xl text-white transition-colors pointer-events-auto">
                                            <Maximize2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* LIVE badge overlay */}
                            {["LIVE", "STARTED", "ONGOING", "RACING"].includes(selectedStream.status?.toUpperCase()) && (
                                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-red-600/90 backdrop-blur-sm rounded-full pointer-events-none z-20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                                    </span>
                                    <span className="text-xs text-white font-black tracking-widest">LIVE</span>
                                </div>
                            )}

                        </div>

                        {/* Stream info bar */}
                        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-100 gap-4">
                            <div>
                                <h3 className="font-black text-zinc-900 text-lg">{selectedStream.race}</h3>
                                <p className="text-zinc-500 text-sm mt-0.5">
                                    {selectedStream.track}{selectedStream.time ? ` · ${selectedStream.time}` : ""} · <strong className="text-zinc-700">{selectedStream.status}</strong>
                                </p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                {canManageYoutubeLink && (
                                    editingLink ? (
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <input 
                                                    type="text" 
                                                    placeholder="Paste a YouTube link or video ID..." 
                                                    value={tempLink}
                                                    onChange={(e) => { setTempLink(e.target.value); setLinkError(""); }}
                                                    onKeyDown={(e) => e.key === "Enter" && handleUpdateLink()}
                                                    className="px-3 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all w-64"
                                                />
                                                <button onClick={handleUpdateLink} className="px-3 py-1.5 bg-amber-400 text-zinc-950 text-xs font-bold rounded-xl hover:bg-amber-500 transition-colors">Save</button>
                                                <button onClick={() => { setEditingLink(false); setLinkError(""); }} className="px-3 py-1.5 bg-zinc-100 text-zinc-600 text-xs font-bold rounded-xl hover:bg-zinc-200 transition-colors">Cancel</button>
                                            </div>
                                            {linkError && <p className="mt-1.5 text-xs font-semibold text-red-500">{linkError}</p>}
                                        </div>
                                    ) : (
                                        <button onClick={() => { setTempLink(selectedStream.youtubeId || ""); setLinkError(""); setEditingLink(true); }} className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-600 rounded-xl text-xs font-bold hover:bg-zinc-100 hover:text-zinc-900 flex items-center gap-1.5 transition-colors">
                                            <LinkIcon className="w-3.5 h-3.5" />
                                            Set Link ({user?.role})
                                        </button>
                                    )
                                )}
                                <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl text-xs font-bold">
                                    <Trophy className="w-3 h-3 inline mr-1" />
                                    {selectedStream.prize}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* LIVE RACE SWITCHER */}
                    {liveRaces.length > 0 && (
                        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                            <h3 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                                <Flame className="w-5 h-5 text-red-500" />
                                Live Events
                            </h3>
                            <div className="space-y-6">
                                {Object.entries(groupRacesByTournament(liveRaces)).map(([tour, races]) => (
                                    <div key={tour} className="space-y-3">
                                        <div className="flex items-center gap-2 px-1 mb-1">
                                            <div className="w-1.5 h-4 bg-red-400 rounded-full"></div>
                                            <h4 className="text-xs font-black text-red-500 uppercase tracking-widest">{tour}</h4>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {races.map((r) => (
                                                <button
                                                    key={r.race}
                                                    onClick={() => setSelectedStream(r)}
                                                    className={`text-left p-4 rounded-2xl border transition-all shadow-sm ${
                                                        selectedStream.race === r.race
                                                            ? "bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 text-white shadow-lg ring-2 ring-red-500/20"
                                                            : "bg-white border-zinc-100 hover:border-red-200 hover:shadow-md text-zinc-700"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className={`font-bold text-sm truncate pr-2 ${selectedStream.race === r.race ? "text-white" : "text-zinc-900"}`}>{r.race}</p>
                                                        <span className="flex items-center gap-1 text-[10px] font-black text-red-500 flex-shrink-0">
                                                            <span className="relative flex h-1.5 w-1.5">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                                                            </span>
                                                            LIVE
                                                        </span>
                                                    </div>
                                                    <p className={`text-xs mb-2 truncate ${selectedStream.race === r.race ? "text-zinc-400" : "text-zinc-500"}`}><MapPin className="w-3 h-3 inline mr-1" />{r.track}</p>
                                                    <div className="flex items-center justify-end text-xs font-bold mt-3 pt-3 border-t border-white/5">
                                                        <span className={`flex items-center gap-1 ${selectedStream.race === r.race ? "text-amber-400" : "text-amber-600"}`}>
                                                            <Trophy className="w-3 h-3" /> {r.prize}
                                                        </span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* UPCOMING SCHEDULE */}
                    <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm">
                        <h3 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-zinc-500" />
                            Upcoming Races
                        </h3>
                        <div className="space-y-6">
                            {Object.entries(groupRacesByTournament(upcomingRaces)).map(([tour, races]) => (
                                <div key={tour} className="space-y-3">
                                    <div className="flex items-center gap-2 px-1 mb-1">
                                        <div className="w-1.5 h-4 bg-zinc-300 rounded-full"></div>
                                        <h4 className="text-xs font-black text-zinc-400 uppercase tracking-widest">{tour}</h4>
                                    </div>
                                    <div className="space-y-2">
                                        {races.map((r) => (
                                            <div 
                                                key={r.race} 
                                                onClick={() => setSelectedStream(r)} 
                                                className={`flex items-center justify-between p-3.5 border rounded-2xl transition-all cursor-pointer group shadow-sm hover:shadow-md ${
                                                    selectedStream.race === r.race 
                                                        ? "bg-gradient-to-r from-amber-50 to-white border-amber-200 ring-2 ring-amber-100 ring-offset-1" 
                                                        : "bg-white border-zinc-100 hover:border-amber-200"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                                                        selectedStream.race === r.race ? "bg-amber-100 text-amber-600" : "bg-zinc-100 text-zinc-400 group-hover:bg-amber-50 group-hover:text-amber-500"
                                                    }`}>
                                                        {r.race.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className={`font-bold text-sm transition-colors ${selectedStream.race === r.race ? "text-amber-700" : "text-zinc-900 group-hover:text-amber-600"}`}>{r.race}</p>
                                                        <p className="text-zinc-500 text-xs mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{r.track}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-right">
                                                    <div>
                                                        <p className="text-xs font-bold text-zinc-400">{r.time}</p>
                                                        <p className="text-xs font-black text-amber-600">{r.prize}</p>
                                                    </div>
                                                    <ChevronRight className={`w-4 h-4 transition-transform ${selectedStream.race === r.race ? "text-amber-500 translate-x-0.5" : "text-zinc-300 group-hover:translate-x-0.5 group-hover:text-amber-400"}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Fan chat ── */}
                <div className="bg-white border border-zinc-200 rounded-3xl shadow-sm flex flex-col overflow-hidden" style={{ maxHeight: "720px" }}>
                    <div className="p-5 border-b border-zinc-100 flex-shrink-0 flex items-center justify-between">
                        <div>
                            <h3 className="font-black text-zinc-900 flex items-center gap-2">
                                <MessageSquare className={`w-5 h-5 ${chatMode === "youtube" ? "text-red-500" : "text-violet-500"}`} />
                                {chatMode === "youtube" ? "YouTube Chat" : "Fan Reactions"}
                            </h3>
                            <p className="text-zinc-500 text-xs mt-0.5">
                                {chatMode === "youtube" ? "Live comments from YouTube" : `${reactions.length} messages · Live feed`}
                            </p>
                        </div>
                        <div className="flex bg-zinc-100 p-1 rounded-xl">
                            <button 
                                onClick={() => setChatMode("youtube")}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${chatMode === "youtube" ? "bg-white text-red-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}
                            >
                                YouTube
                            </button>
                            <button 
                                onClick={() => setChatMode("app")}
                                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${chatMode === "app" ? "bg-white text-violet-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}
                            >
                                App
                            </button>
                        </div>
                    </div>

                    {chatMode === "youtube" ? (
                        <div className="flex-1 bg-zinc-50 relative">
                            {selectedStream.youtubeId ? (
                                <iframe
                                    src={`https://www.youtube.com/live_chat?v=${selectedStream.youtubeId}&embed_domain=${window.location.hostname}`}
                                    className="absolute inset-0 w-full h-full border-0"
                                    title="YouTube live chat"
                                ></iframe>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-zinc-400 p-6 text-center">
                                    <MessageSquare className="w-12 h-12 mb-3 opacity-20" />
                                    <p className="text-sm font-medium">Add a YouTube link to open Live Chat. If Live Chat is disabled for the video, use the App tab.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto p-5 space-y-3">
                                {reactions.length === 0 && (
                                    <div className="flex h-full min-h-48 flex-col items-center justify-center text-center text-zinc-400">
                                        <MessageSquare className="mb-3 h-10 w-10 opacity-20" />
                                        <p className="text-sm font-medium">No comments yet.</p>
                                    </div>
                                )}
                                {reactions.map((r, i) => (
                                    <div key={i} className="flex gap-3">
                                        {/* Avatar */}
                                        <div className={`w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center font-black text-xs ${
                                            r.user === "You"
                                                ? "bg-amber-400 text-zinc-950 shadow-sm"
                                                : "bg-zinc-200 text-zinc-600"
                                        }`}>
                                            {r.user[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-bold ${r.user === "You" ? "text-amber-600" : "text-zinc-400"}`}>{r.user}</span>
                                                {r.hot && <Flame className="w-3 h-3 text-red-400" />}
                                                <span className="text-[10px] text-zinc-300">{r.time}</span>
                                            </div>
                                            <div className={`inline-block px-3.5 py-2 rounded-2xl rounded-tl-sm text-sm font-medium ${
                                                r.user === "You"
                                                    ? "bg-amber-400 text-zinc-950 shadow-sm"
                                                    : "bg-zinc-50 border border-zinc-200 text-zinc-700"
                                            }`}>
                                                {r.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat input */}
                            <div className="p-4 border-t border-zinc-100 flex-shrink-0">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Join the conversation..."
                                        value={chatMsg}
                                        onChange={(e) => setChatMsg(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/15 rounded-2xl outline-none text-sm transition-all"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="w-11 h-11 rounded-2xl bg-amber-400 hover:bg-amber-500 text-zinc-950 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-sm"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Spectator;
