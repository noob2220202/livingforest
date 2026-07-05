export type ProductCategory = "침구" | "배스" | "액세서리";

export interface ProductOption {
  sizes: string[];
  colors: string[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  material: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: "BEST" | "NEW" | "SALE";
  image: string;
  options: ProductOption;
  description: string;
}
