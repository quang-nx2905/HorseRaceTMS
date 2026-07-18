import { useState, useEffect } from "react";
import { Trophy, MapPin, Calendar, DollarSign, X, ChevronRight, ChevronLeft, Flag, Users, CheckCircle2, Clock, Map } from "lucide-react";
import { toast } from "react-hot-toast";

import { getAllHorses } from "../../api/horseApi";
import { userApi } from "../../api/userApi";
import tournamentApi from "../../api/tournamentApi";
import ImageUpload from "../common/ImageUpload";

function CreateTournamentModal({ open, onClose }) {
    const [step, setStep] = useState(1);

    // Form Data
    const [basicInfo, setBasicInfo] = useState({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        prizePool: "",
        bannerUrl: "",
        totalRaces: 3,
        lanesPerRace: 5,
    });

    const [races, setRaces] = useState([]);
    const [activeRaceIndex, setActiveRaceIndex] = useState(0);

    const [availableHorses, setAvailableHorses] = useState([]);
    const [availableJockeys, setAvailableJockeys] = useState([]);
    const [availableReferees, setAvailableReferees] = useState([]);

    useEffect(() => {
        if (open) {
            setStep(1);
            setBasicInfo({
                name: "",
                location: "",
                startDate: "",
                endDate: "",
                prizePool: "",
                bannerUrl: "",
                totalRaces: 3,
                lanesPerRace: 5,
            });
            setRaces([]);
            setActiveRaceIndex(0);

            const fetchData = async () => {
                try {
                    const horsesResponse = await getAllHorses();
                    const allHorses = horsesResponse.data || [];
                    setAvailableHorses(allHorses.filter(h => h.status === 'Approved'));
                    
                    const jockeysResponse = await userApi.getUsers({ role: 'Jockey', page: 1, pageSize: 100 });
                    setAvailableJockeys(jockeysResponse.items || jockeysResponse.data?.items || []);

                    const refereesResponse = await userApi.getUsers({ role: 'Referee', page: 1, pageSize: 100 });
                    setAvailableReferees(refereesResponse.items || refereesResponse.data?.items || []);
                } catch (error) {
                    toast.error("Failed to load horses and jockeys");
                }
            };
            fetchData();
        }
    }, [open]);

    if (!open) return null;

    const generateRaces = () => {
        const newRaces = Array.from({ length: basicInfo.totalRaces }, (_, i) => ({
            id: `race-${i}`,
            name: `Round ${i + 1}`,
            dateTime: "",
            distance: "",
            rewardRatio: "2",
            refereeIds: [],
            participants: []
        }));
        setRaces(newRaces);
    };

    const handleNextStep1 = () => {
        const missingFields = [];
        if (!basicInfo.name) missingFields.push("Tournament Name");
        if (!basicInfo.startDate) missingFields.push("Start Date");
        if (!basicInfo.totalRaces) missingFields.push("Total Races");
        if (!basicInfo.lanesPerRace) missingFields.push("Lanes per Race");

        if (missingFields.length > 0) {
            toast.error(`Please fill in required fields: ${missingFields.join(", ")}`);
            return;
        }

        const parsedPrize = parseFloat(basicInfo.prizePool.toString().replace(/[,.]/g, '') || 0);
        if (parsedPrize <= 0 || isNaN(parsedPrize)) {
            toast.error("Prize Pool must be a valid positive number.");
            return;
        }

        if (races.length !== basicInfo.totalRaces) {
            generateRaces();
        }
        setStep(2);
    };

    const handleNextStep2 = () => {
        let isValid = true;
        let lastRaceTime = basicInfo.startDate ? new Date(`${basicInfo.startDate}T00:00`) : new Date(0);
        let maxTime = basicInfo.endDate ? new Date(`${basicInfo.endDate}T23:59:59`) : new Date(8640000000000000);

        for (let i = 0; i < races.length; i++) {
            const race = races[i];
            if (!race.name || !race.dateTime || !race.distance || !race.rewardRatio || !race.refereeIds || race.refereeIds.length === 0) {
                isValid = false;
                break;
            }
            
            const currentRaceTime = new Date(race.dateTime);
            if (currentRaceTime < lastRaceTime || currentRaceTime > maxTime) {
                toast.error(`Race ${i + 1} time must be after the previous race and within tournament dates.`);
                return;
            }
            lastRaceTime = currentRaceTime;

        }

        if (!isValid) {
            toast.error("Please fill all required race details and assign at least one referee.");
            return;
        }

        setStep(3);
    };

    const handleSubmit = async () => {
        const payload = {
            TourName: basicInfo.name,
            Location: basicInfo.location,
            StartDate: basicInfo.startDate,
            EndDate: basicInfo.endDate,
            BannerUrl: basicInfo.bannerUrl,
            PrizePool: parseFloat(basicInfo.prizePool.toString().replace(/[^0-9.-]+/g, "") || 0),
            Races: races.map(r => ({
                RaceName: r.name,
                RaceDateTime: r.dateTime,
                Distance: parseFloat(r.distance || 0),
                RewardRatio: parseFloat(r.rewardRatio || 2),
                MinParticipants: Math.min(2, basicInfo.lanesPerRace),
                MaxParticipants: basicInfo.lanesPerRace,
                RefereeIds: r.refereeIds.map(id => parseInt(id)),
                Participants: []
            }))
        };

        try {
            await tournamentApi.create(payload);
            toast.success("Tournament created successfully!");
            onClose();
        } catch (error) {
            console.error("Create tournament error details:", error.response?.data || error);
            
            // Handle validation errors (400 Bad Request)
            if (error.response?.status === 400 && error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat().join(", ");
                toast.error(`Validation Error: ${errorMessages}`);
            } else {
                toast.error(error.response?.data?.message || error.response?.data?.title || "Failed to create tournament.");
            }
        }
    };

    const updateRace = (index, field, value) => {
        const newRaces = [...races];
        newRaces[index][field] = value;
        setRaces(newRaces);
    };

    const updateParticipant = (raceIndex, pIndex, field, value) => {
        const newRaces = [...races];
        newRaces[raceIndex].participants[pIndex][field] = value;
        setRaces(newRaces);
    };

    const toggleReferee = (raceIndex, refereeId) => {
        const newRaces = [...races];
        const currentReferees = newRaces[raceIndex].refereeIds || [];
        if (currentReferees.includes(refereeId)) {
            newRaces[raceIndex].refereeIds = currentReferees.filter(id => id !== refereeId);
        } else {
            newRaces[raceIndex].refereeIds = [...currentReferees, refereeId];
        }
        setRaces(newRaces);
    };

    const renderStep1 = () => (
        <div className="max-w-4xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-zinc-100">
                <h3 className="text-2xl font-black text-zinc-900 mb-8 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg">1</span>
                    Basic Tournament Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-semibold text-zinc-700">Tournament Name *</label>
                        <div className="relative">
                            <Trophy size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                value={basicInfo.name}
                                onChange={e => setBasicInfo({ ...basicInfo, name: e.target.value })}
                                placeholder="e.g. Golden Derby Championship"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-4 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-lg"
                            />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-semibold text-zinc-700">Tournament Banner</label>
                        <ImageUpload 
                            value={basicInfo.bannerUrl}
                            onChange={(url) => setBasicInfo({ ...basicInfo, bannerUrl: url })}
                            variant="banner"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Location</label>
                        <div className="relative">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                value={basicInfo.location}
                                onChange={e => setBasicInfo({ ...basicInfo, location: e.target.value })}
                                placeholder="e.g. Tokyo Arena"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Prize Pool ($)</label>
                        <div className="relative">
                            <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="text"
                                value={basicInfo.prizePool}
                                onChange={e => setBasicInfo({ ...basicInfo, prizePool: e.target.value })}
                                placeholder="100,000 or 100.000"
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Start Date *</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="date"
                                value={basicInfo.startDate}
                                onChange={e => setBasicInfo({ ...basicInfo, startDate: e.target.value })}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-zinc-700"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">End Date</label>
                        <div className="relative">
                            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="date"
                                value={basicInfo.endDate}
                                onChange={e => setBasicInfo({ ...basicInfo, endDate: e.target.value })}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-zinc-700"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 my-4 border-t border-zinc-100" />

                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Total Races *</label>
                        <div className="relative">
                            <Flag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="number"
                                min="1"
                                max="20"
                                value={basicInfo.totalRaces}
                                onChange={e => setBasicInfo({ ...basicInfo, totalRaces: parseInt(e.target.value) || 1 })}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold text-zinc-700">Lanes per Race (Horses) *</label>
                        <div className="relative">
                            <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                type="number"
                                min="2"
                                max="16"
                                value={basicInfo.lanesPerRace}
                                onChange={e => setBasicInfo({ ...basicInfo, lanesPerRace: parseInt(e.target.value) || 2 })}
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-5 py-3.5 outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-between items-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-4 rounded-xl text-zinc-500 hover:bg-zinc-100 transition-all font-bold flex items-center gap-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleNextStep1}
                        className="px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white transition-all font-bold flex items-center gap-2"
                    >
                        Configure Races <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => {
        const activeRace = races[activeRaceIndex];
        
        const selectedHorseIds = activeRace.participants.map(p => p.horseId).filter(Boolean);
        const selectedJockeyIds = activeRace.participants.map(p => p.jockeyId).filter(Boolean);

        const minDateTime = activeRaceIndex > 0 && races[activeRaceIndex - 1].dateTime 
            ? races[activeRaceIndex - 1].dateTime 
            : (basicInfo.startDate ? `${basicInfo.startDate}T00:00` : undefined);
            
        const maxDateTime = basicInfo.endDate ? `${basicInfo.endDate}T23:59` : undefined;

        return (
            <div className="max-w-6xl mx-auto mt-8 animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col lg:flex-row gap-6">

                {/* Sidebar for Races List */}
                <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded-3xl p-4 shadow-xl border border-zinc-100 h-fit">
                    <h3 className="font-bold text-zinc-800 mb-4 px-2">All Races ({races.length})</h3>
                    <div className="flex flex-col gap-2">
                        {races.map((r, i) => (
                            <button
                                key={r.id}
                                onClick={() => setActiveRaceIndex(i)}
                                className={`px-4 py-3 rounded-2xl text-left font-semibold transition-all flex items-center justify-between ${activeRaceIndex === i ? 'bg-amber-100 text-amber-700' : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600'}`}
                            >
                                <span>Race {i + 1}</span>
                                {r.name && r.dateTime && r.distance && r.refereeIds?.length > 0 && (
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Race Config */}
                <div className="flex-1 bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-zinc-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-black text-zinc-900 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-lg">2</span>
                            Configure Race {activeRaceIndex + 1}
                        </h3>
                    </div>

                    {activeRace && (
                        <div className="space-y-8">
                            {/* Race Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block mb-2 font-semibold text-zinc-700 text-sm">Race Name *</label>
                                    <input
                                        type="text"
                                        value={activeRace.name}
                                        onChange={e => updateRace(activeRaceIndex, 'name', e.target.value)}
                                        placeholder="e.g. Qualifier 1"
                                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 outline-none focus:border-amber-400 font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold text-zinc-700 text-sm">Date & Time *</label>
                                    <div className="relative">
                                        <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                        <input
                                            type="datetime-local"
                                            value={activeRace.dateTime}
                                            min={minDateTime}
                                            max={maxDateTime}
                                            onChange={e => updateRace(activeRaceIndex, 'dateTime', e.target.value)}
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-amber-400 font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold text-zinc-700 text-sm">Distance (m) *</label>
                                    <div className="relative">
                                        <Map size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                        <input
                                            type="number"
                                            value={activeRace.distance}
                                            onChange={e => updateRace(activeRaceIndex, 'distance', e.target.value)}
                                            placeholder="1200"
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-amber-400 font-medium"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 font-semibold text-zinc-700 text-sm">Reward Ratio (x) *</label>
                                    <div className="relative">
                                        <Trophy size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="1.1"
                                            value={activeRace.rewardRatio}
                                            onChange={e => updateRace(activeRaceIndex, 'rewardRatio', e.target.value)}
                                            placeholder="2.0"
                                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-amber-400 font-medium"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-zinc-100" />

                            {/* Participants Configuration */}
                            <div>
                                <h4 className="font-bold text-zinc-800 mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-zinc-500" /> Referees Assignment
                                </h4>
                                <div className="bg-zinc-50 rounded-2xl border border-zinc-100 mb-6 max-h-60 overflow-y-auto">
                                    {availableReferees.length === 0 ? (
                                        <p className="text-sm text-zinc-500 p-4">No referees available.</p>
                                    ) : (
                                        <div className="flex flex-col divide-y divide-zinc-100">
                                            {availableReferees.map(ref => {
                                                const refId = ref.id || ref.userId;
                                                const refName = ref.name || ref.fullName || `Referee #${refId}`;
                                                const isSelected = (activeRace.refereeIds || []).includes(refId.toString());
                                                return (
                                                    <label key={refId} className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-zinc-100/50 ${isSelected ? 'bg-amber-50/50' : 'bg-white'}`}>
                                                        <input 
                                                            type="checkbox" 
                                                            className="accent-amber-500 w-4 h-4 rounded border-zinc-300 focus:ring-amber-400"
                                                            checked={isSelected}
                                                            onChange={() => toggleReferee(activeRaceIndex, refId.toString())}
                                                        />
                                                        <span className={`font-medium text-sm ${isSelected ? 'text-amber-900 font-semibold' : 'text-zinc-700'}`}>{refName}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                                <h4 className="font-bold text-zinc-800 mb-4 flex items-center gap-2">
                                    <Users size={18} className="text-zinc-500" /> Lane Capacity
                                </h4>
                                <p className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-sm font-medium text-amber-800">
                                    This race has {basicInfo.lanesPerRace} lanes. Horse–jockey pairs will be assigned automatically from L1 after the owner, jockey and admin approval flow is completed.
                                </p>
                                <div className="hidden space-y-3">
                                    {activeRace.participants.map((p, pIndex) => (
                                        <div key={pIndex} className="flex items-center gap-4 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                                            <div className="w-12 h-12 bg-zinc-200 rounded-xl flex items-center justify-center font-black text-zinc-500">
                                                L{p.lane}
                                            </div>
                                            <div className="flex-1 grid grid-cols-2 gap-4">
                                                <div>
                                                    <select
                                                        value={p.horseId}
                                                        onChange={e => updateParticipant(activeRaceIndex, pIndex, 'horseId', e.target.value)}
                                                        className={`w-full border rounded-xl px-4 py-3 outline-none font-medium bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all ${p.horseId ? 'border-zinc-300 text-zinc-900' : 'border-zinc-300 text-zinc-500'}`}
                                                    >
                                                        <option value="">-- Select Horse --</option>
                                                        {availableHorses.map(h => {
                                                            const hid = h.id || h.horseId;
                                                            const hname = h.name || h.horseName || `Horse #${hid}`;
                                                            return (
                                                                <option 
                                                                    key={hid} 
                                                                    value={hid}
                                                                    disabled={hid && selectedHorseIds.includes(hid.toString()) && p.horseId !== hid.toString()}
                                                                >
                                                                    {hname}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                                <div>
                                                    <select
                                                        value={p.jockeyId}
                                                        onChange={e => updateParticipant(activeRaceIndex, pIndex, 'jockeyId', e.target.value)}
                                                        className={`w-full border rounded-xl px-4 py-3 outline-none font-medium bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all ${p.jockeyId ? 'border-zinc-300 text-zinc-900' : 'border-zinc-300 text-zinc-500'}`}
                                                    >
                                                        <option value="">-- Select Jockey --</option>
                                                        {availableJockeys.map(j => {
                                                            const jid = j.id || j.userId;
                                                            const jname = j.name || j.fullName || `Jockey #${jid}`;
                                                            return (
                                                                <option 
                                                                    key={jid} 
                                                                    value={jid}
                                                                    disabled={jid && selectedJockeyIds.includes(jid.toString()) && p.jockeyId !== jid.toString()}
                                                                >
                                                                    {jname}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-10 flex justify-between items-center">
                        <button
                            onClick={() => setStep(1)}
                            className="px-6 py-4 rounded-xl text-zinc-500 hover:bg-zinc-100 transition-all font-bold flex items-center gap-2"
                        >
                            <ChevronLeft size={18} /> Back
                        </button>

                        {activeRaceIndex < races.length - 1 ? (
                            <button
                                onClick={() => setActiveRaceIndex(activeRaceIndex + 1)}
                                className="px-8 py-4 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 transition-all font-bold flex items-center gap-2"
                            >
                                Next Race <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleNextStep2}
                                className="px-8 py-4 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white transition-all font-bold flex items-center gap-2"
                            >
                                Review & Finish <ChevronRight size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderStep3 = () => (
        <div className="max-w-3xl mx-auto mt-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-zinc-100 text-center">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black text-zinc-900 mb-4">Ready to Create!</h3>
                <p className="text-zinc-500 mb-8 max-w-md mx-auto">
                    You are about to create <strong>{basicInfo.name}</strong> with <strong>{races.length} races</strong> and a total of <strong>{races.length * basicInfo.lanesPerRace} participants</strong>.
                </p>

                <div className="bg-zinc-50 rounded-3xl p-6 md:p-8 text-left mb-10 border border-zinc-100">
                    <h4 className="font-bold text-zinc-800 mb-6 flex items-center gap-2 border-b border-zinc-200 pb-4">
                        <Trophy size={20} className="text-amber-500" /> Tournament Summary
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy size={14}/> Name</p>
                            <p className="font-black text-zinc-900 truncate" title={basicInfo.name}>{basicInfo.name}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1"><DollarSign size={14}/> Prize Pool</p>
                            <p className="font-black text-emerald-600">${basicInfo.prizePool || "0"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={14}/> Location</p>
                            <p className="font-bold text-zinc-800 truncate">{basicInfo.location || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar size={14}/> Start Date</p>
                            <p className="font-bold text-zinc-800">{basicInfo.startDate || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Calendar size={14}/> End Date</p>
                            <p className="font-bold text-zinc-800">{basicInfo.endDate || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1"><Flag size={14}/> Total Races</p>
                            <p className="font-bold text-zinc-800">{races.length}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <button
                        onClick={() => setStep(2)}
                        className="px-8 py-4 rounded-xl text-zinc-600 bg-zinc-100 hover:bg-zinc-200 transition-all font-bold"
                    >
                        Go Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-10 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white transition-all font-black shadow-lg shadow-amber-500/30 hover:-translate-y-1"
                    >
                        Publish Tournament
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-50 overflow-y-auto">
            {/* Header / Navbar */}
            <div className="sticky top-0 bg-zinc-950/90 border-b border-white/10 px-6 py-4 flex items-center justify-between z-10 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                        <Trophy size={20} className="text-zinc-950" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">Create Tournament</h2>
                        <p className="text-xs text-zinc-400">Step {step} of 3</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Stepper Progress */}
            <div className="max-w-3xl mx-auto pt-10 px-4">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-zinc-800 -z-10 rounded-full" />
                    <div className={`absolute left-0 top-1/2 h-1 bg-amber-500 -z-10 rounded-full transition-all duration-500`} style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }} />

                    {[1, 2, 3].map(i => (
                        <div key={i} className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-zinc-950 transition-colors duration-500 ${step >= i ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-zinc-500'}`}>
                            {i}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="p-4 pb-20">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </div>
        </div>
    );
}

export default CreateTournamentModal;
