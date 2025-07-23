import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";
import { Header } from "@/Components/Header/header";
import SessionProvider from "@/Components/SessionComponent/index";

// session
const session = await getServerSession();

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
        <SessionProvider session={session}>
          <Header/>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
