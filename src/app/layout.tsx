import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/Components/Header/header";

const poppinsSans = Poppins({
  variable: "--font-poppins-sans",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "Board Tasks",
  description: "Project to create tasks and add share for users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppinsSans.variable}`}>
          <Header/>
          <main>
            {children}
          </main>
      </body>
    </html>
  );
}
