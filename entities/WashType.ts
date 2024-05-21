export class WashType {
  id: number;
  name: string;
  description: string;
  price: number;
  points_reward: number;
  icon: string;

  constructor(
    id: number,
    name: string,
    description: string,
    price: number,
    points_reward: number,
    icon: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.points_reward = points_reward;
    this.icon = icon;
  }
}
