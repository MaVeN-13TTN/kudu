export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  collection: string;
  description: string;
  details: string;
  material: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  lowStock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}