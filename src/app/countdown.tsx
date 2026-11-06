"use client";

import { useEffect, useState } from "react";

const EVENT_DATE = new Date("2026-12-12T00:00:00+00:00").getTime();

type CountdownPart = {
  label: string;
  shortLabel: string;
  value: string;
};

function getCountdownParts(now: number | null): CountdownPart[] {
  if (now === null) {
    return [
      { label: "Days", shortLabel: "D", value: "---" },
      { label: "Hours", shortLabel: "H", value: "--" },
      { label: "Minutes", shortLabel: "M", value: "--" },
      { label: "Seconds", shortLabel: "S", value: "--" },
    ];
  }

  const remaining = Math.max(EVENT_DATE - now, 0);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining / 3_600_000) % 24);
  const minutes = Math.floor((remaining / 60_000) % 60);
  const seconds = Math.floor((remaining / 1_000) % 60);

  return [
    { label: "Days", shortLabel: "D", value: String(days).padStart(3, "0") },
    { label: "Hours", shortLabel: "H", value: String(hours).padStart(2, "0") },
    { label: "Minutes", shortLabel: "M", value: String(minutes).padStart(2, "0") },
    { label: "Seconds", shortLabel: "S", value: String(seconds).padStart(2, "0") },
  ];
}

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const initialUpdate = window.setTimeout(update, 0);
    const interval = window.setInterval(update, 1_000);

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, []);

  const eventIsLive = now !== null && now >= EVENT_DATE;

  if (eventIsLive) {
    return <p className="countdown-live">Event day</p>;
  }

  return (
    <div
      className="countdown-grid"
      role="timer"
      aria-label="Time remaining until Babaal Fest"
    >
      {getCountdownParts(now).map((part, index, parts) => (
        <div className="countdown-part" key={part.label}>
          <span className="countdown-value">{part.value}</span>
          <span className="countdown-unit" aria-label={part.label}>
            {part.shortLabel}
          </span>
          {index < parts.length - 1 && (
            <span className="countdown-separator" aria-hidden="true">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
