import { Client } from "./Client";
import { Extra, Venue } from "./Interfaces";
import { WashType } from "./WashType";

export class Invoice {

    id: number;
    client?: Client;
    venue: Venue;
    extras: Extra[];
    date: Date;
    total_amount: number;
    points_earned: number;
    points_redeemed: number;
    washType: WashType

    constructor( venue: Venue, extras: Extra[], total_amount: number, points_earned: number, points_redeemed: number, date: Date, id: number, washType: WashType, client?: Client) {
        this.client = client;
        this.venue = venue;
        this.extras = extras;
        this.date = date;
        this.total_amount = total_amount;
        this.points_earned = points_earned;
        this.points_redeemed = points_redeemed;
        this.id = id;
        this.washType = washType;
    }
}
