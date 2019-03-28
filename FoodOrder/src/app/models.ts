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
    totalAmount: number;
    totalPrice: number;
    date: Date | string;
}

export class GlobalVariables {
    public static foods: Food[] = [];
}