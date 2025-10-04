// types.ts
export type User = {
  uid: string;
  email: string;
  role: string;
};

export type Company = {
  id: string;
  name: string;
  owner: string;
  editors?: string[];
  category?: string;
};

export type Product = {
  id: string;
  name: string;
  companyId: string;
  stock: number;
  category?: string;
  price?: number;
};