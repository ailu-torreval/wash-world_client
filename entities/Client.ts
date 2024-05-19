import { Invoice } from "./Invoice";
import { Role } from "./role";

interface Car {
  id: number;
  license_plate: string;
}

export class Client {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  reward_points_balance: number;
  role: Role;
  invoices: Invoice[];
  cars: Car[];

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    id: number,
    reward_points_balance: number,
    role: Role,
    invoices: Invoice[],
    cars: Car[]
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.id = id;
    this.reward_points_balance = reward_points_balance;
    this.role = role;
    this.invoices = invoices;
    this.cars = cars;
  }
}
