import "./globals.css";
import { initStoryblok } from "@/lib/storyblok";

export const metadata = { title: "NextJS Storyblok Template" };

export default function RootLayout({ children }) {
  // Initialize Storyblok (register components + apiPlugin) exactly once
  initStoryblok();

  return (
    <html lang="en">
      <body><h1>NextJS Storyblok Template</h1>{children}</body>
    </html>
  );
}
