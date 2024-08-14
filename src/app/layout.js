import Navbar from "@/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Lowrise.ca",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        <Navbar />
        <main className="mx-auto max-w-[90%]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
