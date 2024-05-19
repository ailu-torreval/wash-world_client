export class WashTypeDto {

    id?:number;
    name: string;
    description: string;
    price: number;
    points_reward: number;

    constructor(
        name: string,
        description: string,
        price: number,
        points_reward: number,
        id?:number
    ) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.points_reward = points_reward;
        this.id = id;
    }

}