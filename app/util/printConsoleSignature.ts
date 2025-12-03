export function printConsoleSignature(): void {
  if (typeof window === "undefined") return;
  if ((window as any).__consoleSignaturePrinted) return;
  (window as any).__consoleSignaturePrinted = true;

  const info = {
    name: "I am Shriharsh Nandigamwar",
    title: "Fullstack Developer",
    email: "nandigamwarharsh@gmail.com",
    linkedin: "https://linkedin.com/in/shriharsh-nandigamwar",
    github: "https://github.com/HarshNandigamwar",
    twitter: "https://x.com/Harsh477011?s=09",
    note: "Thanks for visiting my portfolio! ✨",
  };

  const headerStyle = [
    "font-size:16px",
    "font-weight:700",
    "padding:8px 14px",
    "border-radius:8px",
    "color:white",
    "background:linear-gradient(90deg,#06b6d4 0%,#3b82f6 50%,#a855f7 100%)",
    "text-shadow:0 1px 2px rgba(0,0,0,0.2)",
  ].join(";");

  const subStyle = [
    "font-size:12px",
    "font-weight:600",
    "padding:6px 10px",
    "border-radius:6px",
    "color:#111827",
    "background:#f3f4f6",
  ].join(";");

  const label = "font-weight:700; font-size:12px; padding:0 6px;";
  const value = "color:#9ca3af; font-size:12px;";
  const sep = "%c─────────────────────────────────────────────";
  const sepStyle = "color:#ff0000;";

  console.log("%c👋 Hello, curious developer", headerStyle);
  console.log("%c%s", subStyle, `${info.name} · ${info.title}`);
  console.log(sep, sepStyle);

  console.log("%cEmail:   %c %s", label, value, info.email);
  console.log("%cGitHub:  %c %s", label, value, info.github);
  console.log("%cTwitter:  %c %s", label, value, info.twitter);
  console.log("%cLinkedin:  %c %s", label, value, info.linkedin);

  console.log(sep, sepStyle);
  console.log(
    "%c%s",
    "font-size:12px; color:#10b981; font-weight:600;",
    info.note
  );
}
