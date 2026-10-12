export const BUCKET = "cake-photos";

export type Size = {
  id?: string;
  label: string;
  price: number | string;
};

export type Photo = {
  id?: string;
  url: string;
  path: string;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  available: boolean;
  sizes: Size[];
  photos: Photo[];
};

export type Option = {
  id: string;
  name: string;
  sort_order: number;
};