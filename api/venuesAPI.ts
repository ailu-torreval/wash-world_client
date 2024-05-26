import axios from "axios";
import { SuperQueries } from "./SuperQueries";

export class VenuesAPI extends SuperQueries {
  static baseUrl = super.baseUrl + "venue";
  static authUrl = super.baseUrl + "auth";

  // get
  static async fetchAllVenues() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.log("failed at fetching venues", error);
    }
  }

  static async fetchAllVenuesByAdmin(token: string) {
    // add token!!!!!!!!

    const headers = {
      headers: {
        Authorization: "Bearer " + token,
      }
    };

    console.log(headers)

    try {
      const response = await axios.get(this.authUrl + "/admin",  headers );
      return response.data;
    } catch (error) {
      console.log("failed at fetching venues by admin", error);
    }
  }
}
