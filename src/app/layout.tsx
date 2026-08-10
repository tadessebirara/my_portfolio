import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tadesse Birara | Full-Stack JavaScript Developer",
  description:
    "Full-stack JavaScript developer focused on building modern web and mobile applications with reliable frontend, backend, and deployment workflows.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Tadesse Birara | Full-Stack JavaScript Developer",
    description:
      "Full-stack JavaScript developer focused on building modern web and mobile  applications with reliable frontend, backend, and deployment workflows.",
    siteName: "Tadesse Birara Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tadesse Birara | Full-Stack JavaScript Developer",
    description:
      "Full-stack JavaScript developer focused on building modern web and mobile app applications with reliable frontend, backend, and deployment workflows.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
