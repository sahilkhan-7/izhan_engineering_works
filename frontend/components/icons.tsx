type IconName = "arrow" | "call" | "chat" | "menu" | "close" | "pin" | "play" | "download";
type SocialName = "facebook" | "instagram" | "linkedin" | "twitter" | "youtube" | "whatsapp" | "pinterest";

const paths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  call: <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.5-1.5-6.5-4.5-8-8l2-2-2-4Z" />,
  chat: <><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.2A8.5 8.5 0 1 1 21 11.5Z" /><path d="M8 10h8M8 14h5" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  play: <path d="m9 7 8 5-8 5V7Z" />,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></>
};

const socialPaths: Record<SocialName, React.ReactNode> = {
  facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" stroke="none" />,
  instagram: <>
    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </>,
  linkedin: <>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7H10v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </>,
  twitter: <path d="M4 4 8.5 10 4 16h2l3.5-4.4L13 16h4l-5-6.5L16 4h-2l-3 3.8L8 4H4z" fill="currentColor" stroke="none" />,
  youtube: <>
    <rect x="2" y="5" width="20" height="14" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <polygon points="10,9 15,12 10,15" fill="currentColor" stroke="none" />
  </>,
  whatsapp: <>
    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.2A8.5 8.5 0 1 1 21 11.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9.5 9.5s.5 1 1.5 2 2 1.5 2 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>,
  pinterest: <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.19-5.04 1.19-5.04s-.3-.6-.3-1.49c0-1.4.81-2.44 1.82-2.44.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.35-.24 1 .5 1.81 1.49 1.81 1.78 0 3.15-1.88 3.15-4.59 0-2.4-1.73-4.08-4.19-4.08-2.85 0-4.52 2.14-4.52 4.35 0 .86.33 1.78.74 2.28a.3.3 0 0 1 .07.29c-.08.31-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.25-.58-2.03-2.41-2.03-3.88 0-3.16 2.3-6.06 6.63-6.06 3.48 0 6.19 2.48 6.19 5.8 0 3.46-2.18 6.24-5.21 6.24-1.02 0-1.97-.53-2.3-1.15l-.62 2.38c-.23.87-.84 1.96-1.25 2.62.94.29 1.94.45 2.97.45 5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="currentColor" stroke="none" />,
};

export function Icon({ name }: { name: IconName }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{paths[name]}</svg>;
}

export function SocialIcon({ platform }: { platform: string }) {
  const key = platform.toLowerCase().replace(/[^a-z]/g, "") as SocialName;
  const icon = socialPaths[key];
  if (!icon) return <span style={{ fontSize: 11, fontFamily: "JetBrains Mono", fontWeight: 700 }}>{platform.slice(0, 2).toUpperCase()}</span>;
  return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>{icon}</svg>;
}
