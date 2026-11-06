import "./Home.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { logout as apiLogout } from "./api";
import potrie2 from "./assets/images/potrie2.png";
export default function Home() {
    const[sidebaropen,setsidebaropen]=useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));
const logout = async () => {
  await apiLogout();
  setIsLoggedIn(false);
};
  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">

        <div className="nav-left">
          <button className="menu-btn" onClick={()=>setsidebaropen(!sidebaropen)}>☰</button>

          <div className="logo-container">
            <span className="logo-small">POTERIE</span>
            <h1 className="logo">WinaFakhar</h1>
          </div>
        </div>
      <div className="nav-right">

          {!isLoggedIn ? (
            <>
            <Link to="/login">
  <button className="login">Se connecter</button>
</Link>

<Link to="/register">
  <button className="register">S'inscrire</button>
</Link>
            </>
          ) : (
            <li
      onClick={logout}
      style={{ color: "red", cursor: "pointer" }}
    >
      Déconnexion
    </li>
          )}

        </div>
      
      </header>
      <div className="container">
        {/* SIDEBAR */}
    <aside className={sidebaropen ? "sidebar" : "sidebar closed"}>
  <ul>
    <li>Accueil</li>
    <li><Link to="/products">Produits</Link></li>
    <li><Link to="/atelier">Atelier</Link></li>
    <li><Link to="/cadeaux">Cadeaux</Link></li>

    <li><Link to="/panier">Panier</Link></li>

    {isLoggedIn && (
      <li
        onClick={logout}
        style={{ color: "red", cursor: "pointer" }}
      >
        Déconnexion
      </li>
    )}

  </ul>
</aside>

        {/* CONTENT */}
        <main className="content">
          <div className="hero-title">
  <h1>La qualité est notre engagement</h1>
</div>

          {/* SECTION HERITAGE */}
          <section className="heritage-section">

            <motion.div
              className="heritage-image"
              initial={{ x: -150, opacity: 0, scale: 1.1 }}
              whileInView={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <img src={potrie2} alt="Potier"/>
            </motion.div>

            <motion.div
              className="heritage-text"
              initial={{ x: 150, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <span className="subtitle">POTERIE</span>

              <h2>WinaFakhar</h2>

              <h3>HÉRITAGE</h3>

              <p>
                Chez WINAFAKHAR, 
                nous vous invitons à découvrir notre collection de produits de poterie artisanale, 
                fabriqués avec soin et savoir-faire. Chaque pièce reflète l'authenticité de l'artisanat marocain tout en alliant tradition, 
                qualité et élégance. Explorez notre sélection de tajines, vases, assiettes, bols et objets décoratifs, 
                soigneusement conçus pour apporter une touche unique et raffinée à votre intérieur
              </p>

              <button className="heritage-btn">
                EN SAVOIR PLUS
              </button>
            </motion.div>

          </section>
          {/* SECTION ATELIER */}
<section className="atelier-section">

  <motion.div
    className="atelier-text"
    initial={{ x: -150, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1.2 }}
    viewport={{ once: true }}
  >
    <span className="subtitle">ATELIER</span>

    <h2>WinaFakhar</h2>

    <h3>SAVOIR-FAIRE</h3>

    <p>
      Découvrez nos ateliers de poterie, où tradition et créativité se rencontrent. 
      Encadrés par des artisans expérimentés, 
      ils vous permettent de découvrir les techniques de modelage et de décoration de la poterie marocaine tout en vivant une expérience authentique,
       conviviale et enrichissante.
    </p>

    <button className="heritage-btn">
      EN SAVOIR PLUS
    </button>
  </motion.div>

  <motion.div
    className="atelier-image"
    initial={{ x: 150, opacity: 0, scale: 1.1 }}
    whileInView={{ x: 0, opacity: 1, scale: 1 }}
    transition={{ duration: 1.2 }}
    viewport={{ once: true }}
  >
    <img
      src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1200"
      alt="Atelier de poterie"
    />
  </motion.div>

</section>
 <footer className="footer">

  <div className="footer-container">

    <div className="footer-col">
      <h2 className="footer-logo">WinaFakhar</h2>

      <p>
        Découvrez l'authenticité de la poterie marocaine à travers
        nos collections uniques réalisées avec passion par nos artisans.
      </p>
    </div>

    <div className="footer-col">
      <h3>CONTACTEZ NOUS</h3>

      <p>📞 +212 6 12 34 56 78</p>
      <p>📞 +212 6 98 76 54 32</p>
      <p>✉️ contact@winafakhar.com</p>
      <p>✉️ info@winafakhar.com</p>
    </div>

    <div className="footer-col">
      <h3>RÉSEAUX SOCIAUX</h3>

      <p>Facebook</p>
      <p>Instagram</p>
      <p>TikTok</p>
    </div>

  </div>

  <div className="footer-links">
    <a href="#">Contact</a>
    <a href="#">Mentions légales</a>
    <a href="#">FAQ</a>
  </div>

  <div className="footer-bottom">
    © 2026 WinaFakhar. Tous droits réservés.
  </div>

</footer>

        </main>

      </div>

    </div>
  );
}
