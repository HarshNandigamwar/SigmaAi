"use client";
import { useEffect } from "react";
import HomePage from "./home/page";
import { printConsoleSignature } from "./util/printConsoleSignature";
export default function Home() {
  useEffect(() => {
    printConsoleSignature();
  }, []);
  return (
    <main className="h-screen">
      <HomePage />
    </main>
  );
}
