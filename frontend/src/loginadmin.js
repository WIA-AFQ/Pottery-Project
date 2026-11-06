import { useEffect } from "react";
import { LARAVEL_URL } from "./api";

export default function Loginadmin() {
  useEffect(() => {
    window.location.replace(`${LARAVEL_URL}/admin/login`);
  }, []);

  return <p>Ouverture de la connexion administrateur...</p>;
}
