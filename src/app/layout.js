import Navbar from "@/components/Navbar";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/Footer";
import Head from "next/head";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { ClerkProvider } from "@clerk/nextjs";
import NotesForProperties from "@/components/NotesForProperties";
import { ChatBarContextProvider } from "@/app/context/ChatbarContext";
import ChatContainer from "@/components/ChatContainer";

export const metadata = {
  title: "Lowrise.ca",
  description: "",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  //   maximumScale: 1,
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
  category: "Real Estate",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black ">
        <ChatBarContextProvider>
          <NextTopLoader
            color="#FF0000"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #00A1FF,0 0 5px #00A1FF"
          />
          <Navbar />
          <GoogleAnalytics />
          <main className="">{children}</main>
          <Footer />
          <div className="sm:col-span-2 col-span-2">
            <ChatContainer>
              <NotesForProperties />
            </ChatContainer>
          </div>
        </ChatBarContextProvider>
      </body>
    </html>
  );
}
