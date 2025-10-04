import { useEffect, useState } from "react";
import { getCompanies, getMyCompanies, getProductsByCompany, sellProduct, addStock } from "./firestore";
import type { User, Company, Product } from "./types";

type DashboardProps = {
  user: { uid: string; email: string; role: string };
};

export default function Dashboard({ user }: DashboardProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
        const userEmail = user.email || "";

        if (user.role === "superAdmin") {
            setCompanies(await getCompanies());
        } else {
            setCompanies(await getMyCompanies(userEmail));
        }
    };
    fetchCompanies();
  }, [user]);

  useEffect(() => {
    if (selectedCompany) {
        const fetchProducts = async () => {
            setProducts(await getProductsByCompany(selectedCompany.id));
            console.log("products fetched for company", selectedCompany.name, products);
        };

        fetchProducts();
    }
  }, [selectedCompany]);

  return (
    <div>
        <h3 className="text-2xl font-bold mb-4">Dashboard Galaxify</h3>
        <p>Bienvenido {user.email}</p>
        
        {/* Lista de empresas */}
        <div className="grid grid-cols-4 gap-4 mb-6">
            {companies.map(company => (
                <button
                    key={company.id}
                    className={`p-4 border rounded ${selectedCompany?.id === company.id ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                    onClick={() => setSelectedCompany(company)}
                >
                    {company.name}
                </button>
            ))}
        </div>

        {/* Lista de productos de la empresa seleccionada */}
        {selectedCompany && (
            <div>
                <h4 className="text-xl font-semibold mb-2">Productos de {selectedCompany.name}</h4>
                <div className="grid grid-cols-3 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="p-4 border rounded">
                            <h5 className="font-bold">{product.name}</h5>
                            <p>Stock: {product.stock}</p>
                            <p>Precio: ${product.price}</p>
                            <div className="mt-2">
                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded"
                                    onClick={() => sellProduct(p.id, (p.companyId as any).id)}
                                >
                                    Vender
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        )}
    </div>
  );
}
