import { Extra, Venue, WashType } from "./Interfaces";

export class InvoiceDto {

    id:number;
    client_id: number;
    venue_id: number | Venue;
    washType_id: number | WashType;
    extras_ids: number[] | Extra[];
    total_amount: number;
    points_earned: number;
    points_redeemed: number;

    constructor(
        id:number,
        client_id: number,
        venue_id: number | Venue,
        extras_ids: number[]| Extra[],
        total_amount: number,
        points_earned: number,
        washType_id: number| WashType,
        points_redeemed: number
    ) {
        this.id = id;
        this.client_id = client_id;
        this.venue_id = venue_id;
        this.extras_ids = extras_ids;
        this.total_amount = total_amount;
        this.points_earned = points_earned;
        this.points_redeemed = points_redeemed;
        this.washType_id = washType_id;
    }

}