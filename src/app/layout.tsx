"use client";

import "./globals.css";
import { ReactNode, useEffect, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <html lang="en">
      <body className="relative w-full bg-black min-h-screen overflow-hidden text-white">
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-black">
          {/* Background Blurs */}
          <div
            className="absolute w-96 h-96 bg-purple-600 opacity-30 blur-3xl rounded-full transition-all duration-500"
            style={{ top: mouseY - 200, left: mouseX - 200 }}
          />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-600 opacity-40 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div
            className="absolute w-96 h-96 bg-purple-600 opacity-30 blur-3xl rounded-full transition-all duration-500"
            style={{ bottom: mouseY - 200, right: mouseX - 100 }}
          />
          <div className="absolute top-2 right-10 w-80 h-80 bg-purple-600 opacity-30 blur-3xl rounded-full" />
          <div className="absolute bottom-2 left-10 w-80 h-80 bg-purple-600 opacity-30 blur-3xl rounded-full" />
        </div>

        <main className="relative z-10 flex flex-col">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
