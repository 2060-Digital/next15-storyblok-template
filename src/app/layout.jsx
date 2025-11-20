
import "./globals.css";
import { initStoryblok } from "@/lib/storyblok";
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export const metadata = {
  title: {
    default: "Site Name",
    template: "%s | Site Name",
  },
  description:
    "Enter site description",
  openGraph: {
    title: "Site Name",
    description:
      "Enter OG description",
    url: "https://exampledomain.com",
    siteName: "Site Nmae",
    images: [
      {
        url: "choose image from storyblok",
        width: 1200,
        height: 630,
        alt: "Alt Descrption",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Site Name",
    description: "Enter Site description",
    images: ["choose image from storyblok"],
  },
  icons: {
    icon: "/favicon/favicon.ico",
  
  },
}

export default function RootLayout({ children }) {
  // Initialize Storyblok (register components + apiPlugin) exactly once
  initStoryblok();


  return (
    <html lang="en">
       
      <body>
         <Header />
        {children} 
        <Footer />
        </body>
      
    </html>
  );
}
