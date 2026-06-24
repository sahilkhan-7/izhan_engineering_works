import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Izhan Engineering Works", template: "%s | Izhan Engineering" },
  description: "Precision fabrication, industrial sheds, structural steel, gates and architectural metalwork."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
