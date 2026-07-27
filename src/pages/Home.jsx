import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  CirclePlay,
  Clock3,
  Gauge,
  Menu,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import tournamentApi from "../api/tournamentApi";
import heroHorse from "../assets/horse-hero-cinematic.png";
import logo from "../assets/logo.png";
import "./Home.css";

const FEATURES = [
  {
    icon: CalendarDays,
    label: "RACE SCHEDULE",
    title: "Never miss the next race.",
    copy: "Track upcoming tournaments, race times and registration status from one clear schedule.",
    accent: "cyan",
  },
  {
    icon: Trophy,
    label: "TOURNAMENT ENGINE",
    title: "Built for the whole season.",
    copy: "Create brackets, schedule heats and manage every championship from one command center.",
    accent: "gold",
  },
  {
    icon: ShieldCheck,
    label: "TRUSTED RESULTS",
    title: "Fairness, engineered in.",
    copy: "Role-based referee tools and transparent records keep every result clear and verifiable.",
    accent: "violet",
  },
];

const FALLBACK_EVENTS = [
  { name: "Saigon Night Derby", date: "28 JUL", status: "Registration", prize: "50K", entries: 24 },
  { name: "Golden Hoof Cup", date: "03 AUG", status: "Upcoming", prize: "80K", entries: 32 },
  { name: "Champions Grand Prix", date: "12 AUG", status: "Upcoming", prize: "120K", entries: 18 },
];

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [events, setEvents] = useState(FALLBACK_EVENTS);

  useEffect(() => {
    const loadOverview = async () => {
      const tournamentResult = await Promise.resolve(
        tournamentApi.getAll({ page: 1, pageSize: 3 }),
      ).then(
        (value) => ({ status: "fulfilled", value }),
        (reason) => ({ status: "rejected", reason }),
      );

      if (tournamentResult.status === "fulfilled") {
        const result = tournamentResult.value;
        const raw =
          result?.data?.items ||
          result?.items ||
          result?.data?.data?.items ||
          result?.data ||
          [];

        if (Array.isArray(raw) && raw.length) {
          setEvents(
            raw.slice(0, 3).map((event, index) => {
              const start = event.startDate ? new Date(event.startDate) : null;
              return {
                id: event.tourId || event.id,
                name: event.tourName || event.name || `Tournament ${index + 1}`,
                date: start
                  ? start.toLocaleDateString("en-US", { day: "2-digit", month: "short" }).toUpperCase()
                  : "TBA",
                status: event.status || "Upcoming",
                prize: event.prizePool
                  ? Number(event.prizePool).toLocaleString("en-US", { notation: "compact" })
                  : "TBA",
                entries: event.maxParticipants || event.participantCount || 16,
              };
            }),
          );
        }
      }
    };

    loadOverview();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const handleMove = (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty("--mx", `${x * 18}px`);
      hero.style.setProperty("--my", `${y * 12}px`);
    };
    const reset = () => {
      hero.style.setProperty("--mx", "0px");
      hero.style.setProperty("--my", "0px");
    };

    hero.addEventListener("pointermove", handleMove);
    hero.addEventListener("pointerleave", reset);
    return () => {
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", reset);
    };
  }, []);

  const primaryDestination = user ? "/dashboard" : "/register";

  return (
    <main className="home-premium">
      <nav className="home-nav" aria-label="Main navigation">
        <Link to="/" className="home-brand" aria-label="HorseRace TMS home">
          <span className="home-brand-mark"><img src={logo} alt="" /></span>
          <span>HORSE<span>RACE</span></span>
        </Link>

        <div className={`home-nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>Races</a>
          <a href="#platform" onClick={() => setMenuOpen(false)}>Platform</a>
          <Link to="/leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</Link>
        </div>

        <div className="home-nav-actions">
          {user ? (
            <Link to="/dashboard" className="nav-ghost">Dashboard</Link>
          ) : (
            <Link to="/login" className="nav-ghost">Sign in</Link>
          )}
          <Link to={primaryDestination} className="nav-primary">
            {user ? "Enter platform" : "Get started"} <ArrowRight size={15} />
          </Link>
        </div>

        <button
          type="button"
          className="home-menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <section className="home-hero" ref={heroRef}>
        <div className="hero-photo" style={{ backgroundImage: `url(${heroHorse})` }} />
        <div className="hero-grid" />
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-content">
          <div className="hero-kicker">
            <span><Sparkles size={13} /></span>
            The future of horse racing
          </div>
          <h1>
            BUILT FOR
            <span>THE <em>WIN.</em></span>
          </h1>
          <p>
            One intelligent platform for the people who race, manage and live for every
            heart-pounding second.
          </p>
          <div className="hero-actions">
            <Link to={primaryDestination} className="hero-primary">
              {user ? "Open dashboard" : "Start racing"} <ArrowRight size={19} />
            </Link>
            <a href="#experience" className="hero-secondary">
              <CirclePlay size={21} /> Explore the platform
            </a>
          </div>
          <div className="hero-trust">
            <div className="avatar-stack">
              {["JD", "MK", "AT"].map((name) => <span key={name}>{name}</span>)}
            </div>
            <div>
              <strong>Trusted by the racing community</strong>
              <span>Owners · Jockeys · Referees</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll"><span /> SCROLL TO DISCOVER</div>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ENGINEERED TO PERFORM</span>
            <h2>More than a race.<br /><em>An experience.</em></h2>
          </div>
          <p>
            From the starting gate to the final result, every detail is connected,
            immediate and built to keep you ahead.
          </p>
        </div>

        <div className="feature-grid" id="platform">
          {FEATURES.map((feature, index) => (
            <article className={`feature-card accent-${feature.accent}`} key={feature.title}>
              <div className="feature-number">0{index + 1}</div>
              <div className="feature-icon"><feature.icon /></div>
              <span>{feature.label}</span>
              <h3>{feature.title}</h3>
              <p>{feature.copy}</p>
              <Link to={primaryDestination} aria-label={`Explore ${feature.title}`}>
                Explore feature <ChevronRight size={16} />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="race-control-section">
        <div className="control-visual">
          <div className="track-orbit orbit-one" />
          <div className="track-orbit orbit-two" />
          <div className="track-core">
            <Trophy />
            <strong>2.45x</strong>
            <span>LIVE WIN ODDS</span>
          </div>
          <div className="telemetry telemetry-one"><Gauge /> YOUR PICK <b>THUNDER</b></div>
          <div className="telemetry telemetry-two"><Zap /> POTENTIAL WIN <b>245 PTS</b></div>
        </div>
        <div className="control-copy">
          <span className="eyebrow">SMART RACE BETTING</span>
          <h2>Back your pick.<br />Feel every <em>second.</em></h2>
          <p>
            Study the contenders, compare live odds and place your prediction before
            the gates open. Every point and result stays clear from bet to payout.
          </p>
          <ul>
            <li><Check /> Live odds for every eligible contender</li>
            <li><Check /> Clear potential payout before confirming</li>
            <li><Check /> Transparent bet and result history</li>
          </ul>
          <Link to={user ? "/predictions" : "/login"}>Explore race betting <ArrowRight size={18} /></Link>
        </div>
      </section>

      <section className="events-section" id="events">
        <div className="section-heading events-heading">
          <div>
            <span className="eyebrow">NEXT ON THE TRACK</span>
            <h2>The pulse never <em>stops.</em></h2>
          </div>
          <button type="button" onClick={() => navigate(user ? "/tournaments" : "/login")}>
            View all races <ArrowRight size={17} />
          </button>
        </div>

        <div className="event-list">
          {events.map((event, index) => (
            <button
              type="button"
              className="event-row"
              key={event.id || `${event.name}-${index}`}
              onClick={() => navigate(user ? "/tournaments" : "/login", { state: { openTournamentId: event.id } })}
            >
              <span className="event-date">{event.date}</span>
              <span className="event-index">0{index + 1}</span>
              <span className="event-name">
                <small>{event.status}</small>
                <strong>{event.name}</strong>
              </span>
              <span className="event-detail"><Trophy /> <b>{event.prize}</b> prize pool</span>
              <span className="event-detail"><Users /> <b>{event.entries}</b> entries</span>
              <span className="event-arrow"><ArrowRight /></span>
            </button>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="cta-noise" />
        <span className="eyebrow">YOUR RACE STARTS HERE</span>
        <h2>Ready to leave the<br />competition <em>behind?</em></h2>
        <p>Join the modern home of professional horse racing.</p>
        <Link to={primaryDestination}>
          {user ? "Enter HorseRace TMS" : "Create your free account"} <ArrowRight size={19} />
        </Link>
        <div className="cta-notes">
          <span><Check /> Free to start</span>
          <span><Clock3 /> Setup in minutes</span>
          <span><BarChart3 /> Built to scale</span>
        </div>
      </section>

      <footer className="home-footer">
        <Link to="/" className="home-brand">
          <span className="home-brand-mark"><img src={logo} alt="" /></span>
          <span>HORSE<span>RACE</span></span>
        </Link>
        <p>Precision in motion. Excellence by design.</p>
        <span>© {new Date().getFullYear()} HorseRace TMS</span>
      </footer>
    </main>
  );
}

export default Home;
