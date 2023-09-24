export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  numReviews: number;
  isNew: boolean;
  reviews?: any[];
  stock: number;
  countInStock?: number;
}
