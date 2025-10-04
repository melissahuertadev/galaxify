import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import type { Company } from "./types";

const getCompanies = async (): Promise<Company[]> => {
  const snapshot = await getDocs(collection(db, "companies"));
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      owner: data.owner,
      editors: data.editors || [],
      category: data.category || "" 
    } as Company;
  });
};

const getMyCompanies = async (userEmail: string): Promise<Company[]> => {
  const q = query(
    collection(db, "companies"),
    where("owner", "==", userEmail)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      owner: data.owner,
      editors: data.editors || [],
      category: data.category || "" 
    } as Company;
  });
};


export { getCompanies, getMyCompanies };