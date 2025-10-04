import { collection, doc, query, where, getDocs, updateDoc, increment, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import type { Company, Product } from "./types";

// Empresas
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

// Productos
const getProductsByCompany = async (companyId: string): Promise<Product[]> => {
  const companyRef = doc(db, "companies", companyId);
  const q = query(
    collection(db, "products"),
    where("companyId", "==", companyRef)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      companyId: data.companyId,
      stock: data.stock,
      category: data.category || "",
      price: data.price || 0
    } as Product;
  });
}

// Vender un producto (disminuir stock)
const sellProduct = async (productId: string, companyId: string, quantity: number = 1): Promise<void> => {
  await addDoc(collection(db, "sales"), {productId, companyId, quantity, timestamp: serverTimestamp() });
  
  const productRef = doc(db, "products", productId);

  await updateDoc(productRef, {
    stock: increment(-quantity)
  });
};

// Agregar Stock
const addStock = async (productId: string, quantity: number = 1): Promise<void> => {
  const productRef = doc(db, "products", productId);

  await updateDoc(productRef, {
    stock: increment(quantity)
  });
}

export { getCompanies, getMyCompanies, getProductsByCompany, sellProduct, addStock };