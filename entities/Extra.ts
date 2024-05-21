export class Extra {
  id: number;
  name: string;
  icon: string;
  price: number;
  points_price: number;

  constructor(
    id: number,
    name: string,
    icon: string,
    price: number,
    points_price: number
  ) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.price = price;
    this.points_price = points_price;
  }
}
