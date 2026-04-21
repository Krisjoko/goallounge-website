"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { FUNDING_STAGES } from "@/lib/constants";
import CircleCta from "@/components/ui/CircleCta";

type Tab = "build" | "email" | "partnerships" | "book";

const TABS: { id: Tab; label: string; sub: string }[] = [
  {
    id: "book",
    label: "Book a Call",
    sub: "30 minutes. No pitch. Just a conversation.",
  },
  {
    id: "build",
    label: "What Are You Building",
    sub: "Tell us about your project. We will tell you if we can help.",
  },
  {
    id: "email",
    label: "Email Us",
    sub: "Send us a message at general@goallounge.tv",
  },
  {
    id: "partnerships",
    label: "Partnerships",
    sub: "Know someone who could use what we do?",
  },
];

function BuildForm() {
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        tab: "build",
        message: description,
        funding_stage: stage,
        email,
      });
      if (error) throw error;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 font-mono text-[10px] tracking-widest text-[#FF4822] uppercase">
          Received
        </div>
        <p className="font-display text-2xl text-[#E0DDD8]">
          We&rsquo;ll be in touch.
        </p>
        <p className="mt-2 font-sans text-sm text-[#706D66]">
          Usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <h3 className="font-display text-xl text-[#E0DDD8]">
        Tell us what you are building.
      </h3>

      <div>
        <label className="mb-1.5 block font-mono text-[9px] tracking-widest text-[#706D66] uppercase">
          What Are You Building?
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project…"
          rows={4}
          required
          className="w-full resize-none rounded-lg border border-[#4A4740] bg-[#1A1A1A] px-4 py-3 font-sans text-sm text-[#E0DDD8] placeholder-[#4A4740] outline-none transition-colors focus:border-[#706D66]"
        />
      </div>

      <div>
        <label className="mb-2 block font-mono text-[9px] tracking-widest text-[#706D66] uppercase">
          Where Are You At?
        </label>
        <div className="flex flex-wrap gap-2">
          {FUNDING_STAGES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStage(s === stage ? "" : s)}
              className={`rounded-full border px-4 py-1.5 font-sans text-xs transition-colors ${
                stage === s
                  ? "border-[#FF4822] bg-[#FF4822]/10 text-[#FF4822]"
                  : "border-[#4A4740] text-[#706D66] hover:border-[#706D66] hover:text-[#E0DDD8]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-mono text-[9px] tracking-widest text-[#706D66] uppercase">
          Where Can We Reach You?
        </label>
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full rounded-lg border border-[#4A4740] bg-[#1A1A1A] px-4 py-3 font-sans text-sm text-[#E0DDD8] placeholder-[#4A4740] outline-none transition-colors focus:border-[#706D66]"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex items-center gap-3 self-start disabled:opacity-50"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#FF4822] text-[#FF4822] transition-colors group-hover:bg-[#FF4822] group-hover:border-[#FF4822] group-hover:text-[#706D66]" aria-hidden>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5H8M8 5L5 2M8 5L5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#E0DDD8] transition-colors group-hover:text-white">
          {status === "sending" ? "Sending…" : "Send"}
        </span>
      </button>

      {status === "error" && (
        <p className="font-sans text-xs text-red-400">
          Something went wrong — try emailing us directly at{" "}
          <a href="mailto:general@goallounge.tv" className="underline">
            general@goallounge.tv
          </a>
        </p>
      )}
    </form>
  );
}

function EmailForm() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-xl text-[#E0DDD8]">Send us a message.</h3>
      <p className="font-sans text-sm text-[#706D66]">
        Reach us directly at{" "}
        <a
          href="mailto:general@goallounge.tv"
          className="text-[#E0DDD8] underline underline-offset-2 hover:text-white"
        >
          general@goallounge.tv
        </a>
      </p>
      <CircleCta href="mailto:general@goallounge.tv" label="Open Email Client" variant="secondary" className="self-start" />
    </div>
  );
}

function PartnershipsForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        tab: "partnerships",
        name,
        email,
        message: note,
      });
      if (error) throw error;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col gap-2 py-8">
        <p className="font-mono text-[10px] tracking-widest text-[#FF4822] uppercase">
          Thank you
        </p>
        <p className="font-display text-xl text-[#E0DDD8]">Introduction received.</p>
        <p className="font-sans text-sm text-[#706D66]">We&rsquo;ll be in touch with you and them shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <h3 className="font-display text-xl text-[#E0DDD8]">Make an introduction.</h3>
      <p className="font-sans text-sm text-[#706D66]">
        Tell us about them. If it is a good fit, we will reach out on your behalf.
      </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
        className="rounded-lg border border-[#4A4740] bg-[#1A1A1A] px-4 py-3 font-sans text-sm text-[#E0DDD8] placeholder-[#4A4740] outline-none focus:border-[#706D66]"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        required
        className="rounded-lg border border-[#4A4740] bg-[#1A1A1A] px-4 py-3 font-sans text-sm text-[#E0DDD8] placeholder-[#4A4740] outline-none focus:border-[#706D66]"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Tell us about the person or company you're referring…"
        rows={3}
        className="resize-none rounded-lg border border-[#4A4740] bg-[#1A1A1A] px-4 py-3 font-sans text-sm text-[#E0DDD8] placeholder-[#4A4740] outline-none focus:border-[#706D66]"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="group flex items-center gap-3 self-start disabled:opacity-50"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#FF4822] text-[#FF4822] transition-colors group-hover:bg-[#FF4822] group-hover:border-[#FF4822] group-hover:text-[#706D66]" aria-hidden>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5H8M8 5L5 2M8 5L5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#E0DDD8] transition-colors group-hover:text-white">
          {status === "sending" ? "Sending…" : "Send"}
        </span>
      </button>
    </form>
  );
}

function BookCallPanel() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-display text-xl text-[#E0DDD8]">Book a 30-minute call.</h3>
      <p className="font-sans text-sm text-[#706D66]">
        30 minutes. No pitch. Just a conversation.
      </p>
      {bookingUrl ? (
        <CircleCta href={bookingUrl} label="Book a Time" variant="primary" className="self-start" />
      ) : (
        <p className="font-sans text-xs text-[#4A4740]">
          Booking link coming soon — email us at{" "}
          <a href="mailto:general@goallounge.tv" className="text-[#706D66] underline">
            general@goallounge.tv
          </a>
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState<Tab>("book");

  return (
    <section id="get-in-touch" className="px-6 py-20 md:py-28 scroll-mt-14">
      <div className="mx-auto max-w-7xl">
        <div className="section-label mb-4">Get In Touch</div>
        <h2 className="font-display mb-3 text-4xl font-normal text-[#E0DDD8] md:text-5xl">
          30 minutes. No pitch.
          <br />
          Just a conversation.
        </h2>
        <p className="mb-12 max-w-2xl font-sans text-sm leading-relaxed text-[#706D66]">
          Tell us what you are building, or book a call directly.
        </p>

        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Left sidebar — tabs */}
          <div className="flex flex-col gap-1 md:w-56 md:shrink-0">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-start gap-3 rounded-lg p-4 text-left transition-colors ${
                    isActive ? "bg-[#222222]" : "hover:bg-[#1E1E1E]"
                  }`}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="mt-1 shrink-0"
                    aria-hidden
                  >
                    <path
                      d="M1 5H9M9 5L5 1M9 5L5 9"
                      stroke={isActive ? "#FF4822" : "#4A4740"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div>
                    <p
                      className={`font-mono text-[9px] tracking-widest uppercase transition-colors ${
                        isActive ? "text-[#FF4822]" : "text-[#706D66]"
                      }`}
                    >
                      {tab.label}
                    </p>
                    <p className="mt-0.5 font-sans text-xs leading-relaxed text-[#4A4740]">
                      {tab.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right panel */}
          <div className="flex min-h-[520px] flex-1 flex-col rounded-xl bg-[#222222] p-6 md:p-8">
            {activeTab === "build" && <BuildForm />}
            {activeTab === "email" && <EmailForm />}
            {activeTab === "partnerships" && <PartnershipsForm />}
            {activeTab === "book" && <BookCallPanel />}
          </div>
        </div>
      </div>
    </section>
  );
}
