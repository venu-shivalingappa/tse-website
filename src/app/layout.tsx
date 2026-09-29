import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import { site } from "@/content/site";
import { organizationSchema } from "@/lib/schema";
import { siteUrl } from "@/lib/site-url";
import { AnalyticsListener } from "@/components/analytics/AnalyticsListener";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  title: { default: `${site.name} | ${site.positioning}`, template: `%s | ${site.name}` },
  description: site.promise,
  applicationName: site.name,
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0d1526",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${roboto.variable} ${inter.variable}`}>
      <body>
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AnalyticsListener />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
