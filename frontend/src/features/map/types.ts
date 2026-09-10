export type MapProviderName = "kakao" | "naver" | "google";

export interface MapConfig {
  provider: MapProviderName;
  client_key: string;
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface MapViewProps {
  clientKey: string;
  center: LatLng;
  level?: number;
}
