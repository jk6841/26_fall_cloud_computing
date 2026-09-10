import { useEffect, useRef } from "react";

import { loadScript } from "../loadScript";
import type { MapViewProps } from "../types";

declare global {
  interface Window {
    // biome-ignore lint/suspicious/noExplicitAny: Kakao Maps SDK ships no official types
    kakao: any;
  }
}

export function KakaoMap({ clientKey, center, level = 3 }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadScript(
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${clientKey}&autoload=false`,
    ).then(() => {
      if (cancelled || !containerRef.current) return;
      window.kakao.maps.load(() => {
        if (cancelled || !containerRef.current) return;
        new window.kakao.maps.Map(containerRef.current, {
          center: new window.kakao.maps.LatLng(center.lat, center.lng),
          level,
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [clientKey, center.lat, center.lng, level]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
