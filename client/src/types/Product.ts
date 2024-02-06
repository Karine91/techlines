export interface IProduct {
  _id: string;
  name: string;
  images: string[];
  description: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  numberOfReviews: number;
  productIsNew: boolean;
  reviews?: IReview[];
  stock: number;
  subtitle: string;
  stripeId: string;
  updatedAt: string;
}

export interface IReview {
  comment: string;
  createdAt: string;
  name: string;
  rating: number;
  title: string;
  updatedAt: string;
  user: string;
  _id: string;
}
