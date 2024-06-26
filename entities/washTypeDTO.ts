export class WashTypeDto {
  id: number;
  name: string;
  description: string;
  price: number;
  points_reward: number;
  icon: string;

  constructor(
    name: string,
    description: string,
    price: number,
    points_reward: number,
    icon: string,
    id: number
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.points_reward = points_reward;
    this.icon = icon;
    this.id = id;
  }
}
