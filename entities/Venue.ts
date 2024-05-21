import { Invoice } from "./Invoice";

export class Venue {
    id: number;
    name: string;
    address: string;
    zip: number;
    city: string;
    lat: number;
    lng: number;
    invoices?: Invoice[];

    constructor(
        id: number,
        name: string,
        address: string,
        zip: number,
        city: string,
        lat: number,
        lng: number,
        invoices?: Invoice[]
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.zip = zip;
        this.city = city;
        this.lat = lat;
        this.lng = lng;
        this.invoices = invoices;
    }
  }