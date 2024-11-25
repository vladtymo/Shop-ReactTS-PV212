export interface ProductModel {
    id: number;
    name: string;
    price: number;
    discount: number;
    quantity: number;
    imageUrl: string;
    categoryName?: string;
    description?: string;
    liked: boolean;
}

export type ProductFormFields = {
    id?: number;
    name?: string;
    price?: string;
    discount?: number;
    quantity?: number;
    categoryId?: number;
    description?: string;
    imageUrl?: string;
    image?: File;
};