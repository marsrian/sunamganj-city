import Navbar from "@/components/common/Navbar";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/common/Footer";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

export const metadata = {
  metadataBase: new URL("https://sunamganj-city.vercel.app"),
  title: {
    default: "Sunamganj City | Discover Culture, Events & Local Life",
    template: "%s | Sunamganj City | Discover Culture, Events & Local Life",
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
    "sunamganj badhon",
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
    local: "en_US",
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
      <head>
        {/* Google Analytics: */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-8LPQZJY8CW"
        ></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8LPQZJY8CW');`}
        </Script>
        {/* Google Search Console: */}
        <meta
          name="google-site-verification"
          content="j_AwOCR1SXdt-QbHMd5RPsHkm5GMcn9DnKf6aAGkxV8"
        />
      </head>
      <body>
        <NextAuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <div className="min-h-[calc(100vh-50px)]">{children}</div>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
