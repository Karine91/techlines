export interface IProduct {
  _id: string;
  name: string;
  images: string[];
  description: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  numReviews: number;
  productIsNew: boolean;
  reviews?: any[];
  stock: number;
  subtitle: string;
  stripeId: string;
}
