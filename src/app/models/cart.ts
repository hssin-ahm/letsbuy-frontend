import { Produit } from "./produit";
import { User } from "./user";

export interface Cart {
    id: number;
    produit: Produit;
    user: User;
    quantity: number;

}
