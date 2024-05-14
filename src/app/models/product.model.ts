export interface ProductModel{
    id?:number
    handle?: string;
    title?: string;
    description?: string;
    sku?: string;
    Grams?: string;
    stock?: number;
    price?: number; 
    priceCompare?: number;
    barcode?: string;
    status?: boolean;
}