import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarClient from "@/components/navbar/action";
import FooterClient from "@/components/footer/action";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bahbar",
  description: "A la recherche du bar parfait ? Trouvez-le avec Bahbar !",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background-custom text-amber-50 min-h-dvh`}>
      <div className="flex flex-col w-full min-h-dvh ">
          <div className="flex flex-row gap-4 w-full h-full flex-1">
              <NavbarClient />
              {children}
          </div>
          <FooterClient />
      </div>
      </body>
    </html>
  );
}
