export class Food {
    id: string;
    name: string;
    price: number;
    description: string;
    cookingTime: number;
    image: string;
    amount: number;
    comment: string;
}

export class Order {
    id: string;
    foods: Food[];
    totalPrice: number;
    date: Date;
}

export class GlobalVariables {
    public static order: Order = new Order();
}