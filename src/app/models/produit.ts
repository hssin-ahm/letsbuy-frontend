import { Categorie } from "./categorie";

export interface Produit {
    id: number;
    name: string;
    prix: number;
    quantite: number;
    imgName: string;
    description: string;
    categorie: Categorie;

}
