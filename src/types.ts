export type CenterStatus = "receiving" | "full";
export type CenterKind = "collection" | "warehouse";

export interface Center {
  id: string;
  name: string;
  displayName: string;
  kind: CenterKind;
  region: string | null;
  address: string;
  hours: string | null;
  zip: string;
  state: string | null;
  city: string | null;
  lat: number;
  lng: number;
  status: CenterStatus;
  precision: "exact" | "approximate";
}

export interface RankedCenter extends Center {
  distanceMi: number | null;
}

export type Lang = "es" | "en";
export type Filter = "receiving" | "all" | "warehouse";
export type Sort = "near" | "name";

export interface Origin {
  lat: number;
  lng: number;
  label: string;
}
