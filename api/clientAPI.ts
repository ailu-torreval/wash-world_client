import axios from "axios";
import { SuperQueries } from "./SuperQueries";
import { LoginUserDto } from "../entities/LoginUserDTO";
import { SignupUserDto } from "../entities/SignupUserDTO";


export class ClientAPI extends SuperQueries {
  static authUrl = super.baseUrl + "auth";


  static async login(loginUserDto: LoginUserDto) {
    console.log(this.authUrl)
    try {
      const token = await axios.post(this.authUrl + "/login", loginUserDto);
      const response = await this.getProfile(token.data);
      return {client: response, token: token.data};
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  static async getProfile(token:string) {
    try {
      const response = await axios.get(this.authUrl + "/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.log("error login",this.authUrl, error);
      throw error;
    }
  }

  static async signup(signupUserDto: SignupUserDto) {
    try {
      const signupClient = await axios.post(this.authUrl + "/signup", signupUserDto);

      const loginObject: LoginUserDto = {
        email: signupUserDto.email,
        password: signupUserDto.password
      };
      const token = await axios.post(this.authUrl + "/login", loginObject);

      return {client: signupClient.data, token: token.data};
    } catch (error) {
      console.log("error signup", error);
      throw error;
    }
  }

  static async logout() {
    // delete the token from local storage

}
}