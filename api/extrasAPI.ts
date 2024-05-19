import axios from "axios";
import { SuperQueries } from "./SuperQueries";

export class ServicesAPI extends SuperQueries {
  static washTypesUrl = super.baseUrl + "wash-type";
  static extrasUrl = super.baseUrl + "extra";
  // get extras

  static async fetchAllExtras() {
    try {
      const response = await axios.get(this.extrasUrl);
      return response.data;
    } catch (error) {
      console.log("failed at fetching extras", error);
    }
  }
}
