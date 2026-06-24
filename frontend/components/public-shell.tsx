import type { SiteSettings } from "@/lib/types";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PublicShell({ settings, children }: { settings: SiteSettings; children: React.ReactNode }) {
  return <><SiteHeader phone={settings.phone} whatsapp={settings.whatsapp} />{children}<SiteFooter settings={settings} /></>;
}
