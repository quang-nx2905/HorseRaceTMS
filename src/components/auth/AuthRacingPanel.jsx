import { ArrowRight, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import heroHorse from "../../assets/horse-hero-cinematic.png";
import logo from "../../assets/logo.png";
import "./AuthRacingPanel.css";

const CONTENT = {
    login: {
        eyebrow: "WELCOME BACK TO THE TRACK",
        title: <>Built for the <em>race.</em></>,
        copy: "Control every tournament. Follow every contender. Feel every finish.",
    },
    register: {
        eyebrow: "A NEW JOURNEY BEGINS",
        title: <>Your race starts <em>here.</em></>,
        copy: "Step into a connected platform made for the people who live for horse racing.",
    },
};

function AuthRacingPanel({ variant = "login" }) {
    const content = CONTENT[variant] || CONTENT.login;

    return (
        <aside className="auth-racing-panel">
            <div className="auth-racing-photo" style={{ backgroundImage: `url(${heroHorse})` }} />

            <Link to="/" className="auth-racing-brand" aria-label="Back to home">
                <span><img src={logo} alt="" /></span>
                <div>
                    <strong>HORSE<span>RACE</span></strong>
                    <small>TOURNAMENT SYSTEM</small>
                </div>
            </Link>

            <div className="auth-racing-content">
                <div className="auth-racing-eyebrow"><Flag size={13} /> {content.eyebrow}</div>
                <h2>{content.title}</h2>
                <div className="auth-racing-summary">
                    <p>{content.copy}</p>
                    <span><ArrowRight size={15} /></span>
                </div>
            </div>

            <div className="auth-racing-footer">
                <span>TRACK</span><i />
                <span>COMPETE</span><i />
                <span>WIN</span>
            </div>
        </aside>
    );
}

export default AuthRacingPanel;
