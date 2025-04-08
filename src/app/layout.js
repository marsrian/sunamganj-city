import Navbar from "@/components/common/Navbar";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/common/Footer";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  metadataBase: new URL("https://sunamganj-city.vercel.app"),
  title: {
    default: "Sunamganj City | Discover Culture, Events & Local Life",
    template: "%s | Sunamganj City",
  },
  description:
    "Explore Sunamganj district – your guide to local culture, upcoming events, history, and lifestyle. Stay connected with the heart of Sylhet.",
  applicationName: "Sunamganj City",
  keywords: [
    "Sunamganj",
    "Sunamganj district",
    "Sunamganj events",
    "Sunamganj culture",
    "Sylhet tourism",
    "Bangladesh travel",
    "Sunamganj blog",
    "Local news Sunamganj",
    "Haor area Bangladesh",
    "Sunamganj lifestyle",
    "Shimul bagan sunamganj",
    "Niladri lake sunmaganj",
    "Haor bilash sunamganj",
    "Tanguar haor",
    "pahar bilash",
    "sunamganj badhon"
  ],
  authors: [
    { name: "Mars Rian", url: "https://afzal-hussain-rian.vercel.app/" },
  ],
  creator: "Mars Rian",
  publisher: "Mars Rian",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    title: "Sunamganj City | Discover Culture, Events & Local Life",
    description:
      "Learn about the vibrant life of Sunamganj district — from haor beauty to cultural events and local heritage. Updated blog posts and more.",
    url: "https://sunamganj-city.vercel.app",
    siteName: "Sunamganj City",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://sunamganj-city.vercel.app/og-image.jpg", // You should create and upload this OG image
        width: 1200,
        height: 630,
        alt: "Sunamganj City - Explore Culture, Events and More",
      },
    ],
    icons: {
      icon: ["/favicon.ico?v=4"],
      apple: ["/apple-touch-icon.png?v=4"],
      shortcut: ["/apple-touch-icon.png"],
    },
  },
  twitter: {
    title: "Sunamganj City | Discover Culture, Events & Local Life",
    description:
      "Explore Sunamganj: Culture, festivals, nature, and community updates. Get the latest from this beautiful corner of Sylhet.",
    handle: "@sunamganjcity",
    site: "https://sunamganj-city.vercel.app",
    cardType: "summary_large_image",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="min-h-[calc(100vh-50px)]">
              {children}
            </div>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
