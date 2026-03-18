"use client";

/**
 * Decorazioni Pasqua animate: uova che cadono, coniglietti e colombe che fluttuano.
 * Renderizzato solo quando isEasterSeason() è true (gestito dal layout).
 */
const FALLING = [
  { emoji: "🥚", left: "4%", delay: "0s", duration: "20s" },
  { emoji: "🐣", left: "14%", delay: "3s", duration: "24s" },
  { emoji: "🥚", left: "24%", delay: "6s", duration: "18s" },
  { emoji: "🐰", left: "34%", delay: "1s", duration: "22s" },
  { emoji: "🕊️", left: "44%", delay: "4s", duration: "26s" },
  { emoji: "🥚", left: "54%", delay: "8s", duration: "19s" },
  { emoji: "🐣", left: "64%", delay: "2s", duration: "23s" },
  { emoji: "🐇", left: "74%", delay: "5s", duration: "21s" },
  { emoji: "🥚", left: "84%", delay: "7s", duration: "25s" },
  { emoji: "🕊️", left: "94%", delay: "9s", duration: "20s" },
];

const FLOATING = [
  { emoji: "🌸", left: "8%", top: "18%", delay: "0s" },
  { emoji: "🐰", left: "92%", top: "25%", delay: "0.8s" },
  { emoji: "🥚", left: "3%", top: "45%", delay: "1.2s" },
  { emoji: "🐣", left: "96%", top: "50%", delay: "0.3s" },
  { emoji: "🌸", left: "88%", top: "70%", delay: "1.5s" },
  { emoji: "🕊️", left: "5%", top: "78%", delay: "0.5s" },
  { emoji: "🐇", left: "90%", top: "88%", delay: "1s" },
  { emoji: "🥚", left: "12%", top: "92%", delay: "0.2s" },
  { emoji: "🐣", left: "78%", top: "12%", delay: "1.8s" },
  { emoji: "🌸", left: "50%", top: "35%", delay: "0.6s" },
];

export function EasterDecos() {
  return (
    <div className="easter-decos" aria-hidden>
      {FALLING.map((d, i) => (
        <span
          key={`fall-${i}`}
          className="easter-deco easter-deco--fall"
          style={{
            left: d.left,
            animationDelay: d.delay,
            animationDuration: d.duration,
          }}
        >
          {d.emoji}
        </span>
      ))}
      {FLOATING.map((d, i) => (
        <span
          key={`float-${i}`}
          className="easter-deco easter-deco--float"
          style={{
            left: d.left,
            top: d.top,
            animationDelay: d.delay,
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  );
}
