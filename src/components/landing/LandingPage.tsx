"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import Nav from "./Nav";
import Hero from "./Hero";
import FlightSequence from "./FlightSequence";
import AITelemetry from "./AITelemetry";
import LanguageBank from "./LanguageBank";
import Instruments from "./Instruments";
import LaunchCTA from "./LaunchCTA";
import LandingFooter from "./LandingFooter";

// Landing "cassette futurism / mission control"
export default function LandingPage() {
    const [booted, setBooted] = useState(false);

    // Bloquea el scroll durante la secuencia de arranque
    useEffect(() => {
        document.body.style.overflow = booted ? "" : "hidden";
        if (booted) ScrollTrigger.refresh();
        return () => {
            document.body.style.overflow = "";
        };
    }, [booted]);

    return (
        <div className="icv relative min-h-screen">
            <Cursor />
            <div className="icv-scan" aria-hidden="true" />

            {!booted && <Preloader onDone={() => setBooted(true)} />}

            <Nav />

            <main>
                <Hero play={booted} />
                <FlightSequence />
                <AITelemetry />
                <LanguageBank />
                <Instruments />
                <LaunchCTA />
            </main>

            <LandingFooter />
        </div>
    );
}
