export class SignupUserDto {
  firstname: string;
  email: string;
  lastname: string;
  password: string;
  license_plate: string;

  constructor(firstname: string, email: string, lastname: string, password: string, license_plate: string) {
    this.firstname = firstname;
    this.email = email;
    this.lastname = lastname;
    this.password = password;
    this.license_plate = license_plate;
  }
}
