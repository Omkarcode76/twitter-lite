import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider} from "./context/UserContext";
import AuthLoader from "./components/AuthLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "twitter-clone",
  description: "twitter- a twitter lite clone",
};

export default function RootLayout({ children }) {
  
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black text-white overflow-y-auto overscroll-none no-scrollbar`}
    >
      <body>
        <UserProvider>
          <AuthLoader />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
