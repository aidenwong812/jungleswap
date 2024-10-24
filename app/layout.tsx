
import { Inter } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

import { GlobalProvider } from "../context/GlobalContext";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#6f39eb] justify-center items-center">
      <body className={inter.className}>
        <Suspense>
          <GlobalProvider>
            <ToastContainer />
            <div className=" bg-[#0c0c0c] w-full flex flex-col justify-center min-h-[600px] h-screen items-center relative overflow-auto bg-[url('/background.webp')] bg-cover bg-repeat">
              <div className={inter.className}>{children}</div>
            </div>
          </GlobalProvider>
        </Suspense>
      </body>
    </html>
  );
}
