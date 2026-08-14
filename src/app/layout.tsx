import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tadesse Birara | Full-Stack JavaScript Developer",
  description:
    "Full-stack JavaScript developer focused on building modern web and mobile applications with reliable frontend, backend, and deployment workflows.",
  metadataBase: new URL("https://tadessebirara.dev"),
  openGraph: {
    title: "Tadesse Birara | Full-Stack JavaScript Developer",
    description:
      "Full-stack JavaScript developer focused on building modern web and mobile applications with reliable frontend, backend, and deployment workflows.",
    siteName: "Tadesse Birara Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tadesse Birara | Full-Stack JavaScript Developer",
    description:
      "Full-stack JavaScript developer focused on building modern web and mobile applications with reliable frontend, backend, and deployment workflows.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        Inline script runs before React hydration to apply the dark class
        immediately, preventing any flash of light-mode content.
        The portfolio uses dark mode as its default and only theme.
      */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("dark");`,
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
