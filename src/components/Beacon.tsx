"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function VisibilityListener() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {

    if (prevPath.current !== pathname) {

      const personalData = {
        url: window.location.href,
      };

      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width,
        screen.height,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      ].join('|');

      navigator.sendBeacon("/api/beacon", JSON.stringify({ ...personalData, fingerprint }));
      prevPath.current = pathname;
    }
  }, [pathname]);

  return null;
}
