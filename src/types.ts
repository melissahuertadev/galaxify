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