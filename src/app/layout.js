import Navbar from "@/components/common/Navbar";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/common/Footer";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Sunamganj City",
  description: "Generated by create next app",
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
