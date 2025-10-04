import { useEffect, useState } from "react";
import { getCompanies, getMyCompanies } from "./firestore";
import type { Company } from "./types";

type DashboardProps = {
  user: { uid: string; email: string; role: string };
};

export default function Dashboard({ user }: DashboardProps) {
  const [companies, setCompanies] = useState<Company[]>([]);

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

  return (
    <div>
      <h3>Bienvenido {user.email}</h3>
      <ul>
        {companies.map(c => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
