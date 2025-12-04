"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollToBottom() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.scrollTo({
      top: Infinity, 
      behavior: "smooth",
    });
  }, [pathname]);
}