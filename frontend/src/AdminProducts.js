import { useEffect } from "react";
import { LARAVEL_URL } from "./api";

export default function AdminProducts() {
  useEffect(() => {
    window.location.replace(`${LARAVEL_URL}/admin/products`);
  }, []);

  return <p>Ouverture de la gestion des produits...</p>;
}
