

import axios from "axios";
import { SuperQueries } from "./SuperQueries";

export class VenuesAPI extends SuperQueries {
  static baseUrl = super.baseUrl + "venue";

  // get
  static async fetchAllVenues() {
    try {
      const response = await axios.get(this.baseUrl);
      return response.data;
    } catch (error) {
      console.log("failed at fetching venues", error);
    }
  }

  static async fetchAllVenuesByAdmin() {
    // add token!!!!!!!!
    try {
      const response = await axios.get(this.baseUrl + "/admin");
      return response.data;
    } catch (error) {
      console.log("failed at fetching venues by admin", error);
    }
  }
}

