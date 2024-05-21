import { Invoice } from "./Invoice";

export interface Venue {
  id: number;
  name: string;
  address: string;
  zip: number;
  city: string;
  lat: number;
  lng: number;
  invoices?: Invoice[];
}

export interface Extra {
  id: number;
  name: string;
  icon: string;
  price: number;
  points_price: number;
}

export interface WashType {
  id: number;
  name: string;
  description: string;
  price: number;
  points_reward: number;
  icon: string;
}
