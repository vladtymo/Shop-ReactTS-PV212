export interface ProductModel {
    id: number;
    title: string;
    price: number;
    discount: number;
    quantity: number;
    imageUrl: string;
    categoryName?: string;
    description?: string;
}

export type ProductFormFields = {
    id?: number;
    title?: string;
    price?: string;
    discount?: number;
    quantity?: number;
    categoryId?: number;
    description?: string;
    imageUrl?: string;
};