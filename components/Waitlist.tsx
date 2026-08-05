"use client";

import { useState, FormEvent } from "react";
import GridTicks from "./GridTicks";
import EDMVisual from "./EDMVisual";
import { COUNTRIES } from "@/lib/countries";

type Status = "idle" | "submitting" | "success" | "error";

export default function Waitlist() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [waitlistNumber, setWaitlistNumber] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country, email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      setWaitlistNumber(data.waitlistNumber ?? null);
      setStatus("success");
      setName("");
      setCountry("");
      setEmail("");
    } catch {
      setErrorMsg("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  return (
    <section
      id="waitlist"
      className="snap-section relative flex flex-col justify-center px-6 md:px-10 border-t border-line"
      style={{ paddingTop: "var(--topbar-h)" }}
    >
      <GridTicks />
      <div className="parallax-grid opacity-30" />
      <EDMVisual className="left-[-22%] bottom-[-30%] opacity-35" />

      <div className="relative z-10 grid lg:grid-cols-[1fr_460px] gap-10 lg:gap-16 py-14 lg:py-0">
        {/* Left — framing copy */}
        <div className="flex flex-col justify-center">
          <p className="mono-label text-[12px] text-smoke-300 mb-6">
            <span className="text-accent">/</span> Pre-launch / 2026
          </p>
          <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight text-[11vw] sm:text-[8vw] md:text-[5.2vw] lg:text-[4.4vw] mb-6">
            Request
            <br />
            Access.
          </h2>
          <p className="text-smoke-300 max-w-md leading-relaxed">
            EDMVerse is currently in pre-launch. Join the waitlist for early
            access and updates as the platform opens up.
          </p>
        </div>

        {/* Right — form */}
        <div className="lg:border-l lg:border-line lg:pl-10 flex flex-col justify-center backdrop-blur-[2px]">
          {status === "success" ? (
            <div className="border border-line px-8 py-10">
              <p className="mono-label text-[12px] text-accent mb-4">
                [ Confirmed ]
              </p>
              <h3 className="font-display font-bold text-2xl mb-3">
                You&apos;re on the list.
              </h3>
              <p className="text-smoke-300 leading-relaxed">
                {waitlistNumber
                  ? `Your waitlist number is #${waitlistNumber}.`
                  : "We&apos;ll email you as soon as EDMVerse opens up."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mono-label text-[11px] text-smoke-400 block mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2}
                  placeholder="Your full name"
                  className="w-full bg-transparent border border-line focus:border-accent px-4 py-3 text-white placeholder:text-smoke-400/60 outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="mono-label text-[11px] text-smoke-400 block mb-2"
                >
                  Country
                </label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="w-full bg-ink-950 border border-line focus:border-accent px-4 py-3 text-white outline-none transition-colors appearance-none"
                >
                  <option value="" disabled>
                    Select your country
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mono-label text-[11px] text-smoke-400 block mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@domain.com"
                  className="w-full bg-transparent border border-line focus:border-accent px-4 py-3 text-white placeholder:text-smoke-400/60 outline-none transition-colors"
                />
              </div>

              {status === "error" && (
                <p className="text-accent text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mono-label text-[12px] bg-accent hover:bg-white disabled:opacity-60 disabled:cursor-not-allowed text-ink-950 font-semibold px-7 py-4 transition-colors w-full sm:w-auto"
              >
                {status === "submitting" ? "Submitting…" : "Request Access"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
