import "./Products.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api, logout as apiLogout } from "./api";
import { defaultImage, mapProduct } from "./productImages";


export default function Products() {
  const [sidebaropen, setsidebaropen] = useState(true);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
    api("/products", { auth: false })
      .then((data) => {
        setProducts(Array.isArray(data) ? data.map(mapProduct) : []);
        setLoading(false);
      })
      .catch(() => {
        setLoadError("Impossible de charger les produits depuis le serveur. Vérifiez que Laravel et la base de données sont démarrés.");
        setLoading(false);
      });
  }, []);
  const increase = (product) => {
    const exist = cart.find((p) => p.id === product.id);
    let updated;
    if (exist) {
      updated = cart.map((p) =>
        p.id === product.id ? { ...p, qty: p.qty + 1 } : p
      );
    } else {
      updated = [...cart, { ...product, qty: 1 }];
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const decrease = (id) => {
    const updated = cart
      .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
      .filter((p) => p.qty > 0);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const getQty = (id) => {
    const item = cart.find((p) => p.id === id);
    return item ? item.qty : 0;
  };

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <button className="menu-btn" onClick={() => setsidebaropen(!sidebaropen)}>☰</button>
          <div className="logo-container">
            <span className="logo-small">POTERIE</span>
            <h1 className="logo">WinaFakhar</h1>
          </div>
        </div>
        <div className="nav-right">
          <Link to="/login"><button className="login">Se connecter</button></Link>
          <Link to="/register"><button className="register">S'inscrire</button></Link>
        </div>
      </header>

      <div className="container">
        {/* SIDEBAR */}
        <aside className={sidebaropen ? "sidebar" : "sidebar closed"}>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/products">Produits</Link></li>
            <li><Link to="/atelier">Atelier</Link></li>
            <li><Link to="/cadeaux">Cadeaux</Link></li>
            <li><Link to="/panier">Panier</Link></li>
            <li onClick={() => { void apiLogout().then(() => { window.location.href = "/"; }); }}>Déconnexion</li>
          </ul>
        </aside>

        {/* CONTENT */}
        <main className="content">
          <div className="products-page">
            <h1 className="products-title">Nos Produits</h1>

            {loading ? (
              <p>Chargement...</p>
            ) : loadError ? (
              <p role="alert">{loadError}</p>
            ) : products.length === 0 ? (
              <p>Aucun produit n'est disponible pour le moment.</p>
            ) : (
              <div className="products-grid">
                {products.map((p) => (
                  <div className="product-card" key={p.id}>
                    <img 
                      src={p.image || defaultImage} 
                      alt={p.name} 
                      onError={(e) => { e.target.src = defaultImage; }}
                    />

                    <div className="product-info">
                      <h3>{p.name}</h3>
                      <p>{p.desc}</p>
                      <p className="price">{p.price} DH</p>
                    </div>

                    {/* Cart Control */}
                    {getQty(p.id) === 0 ? (
                      <button className="add-btn" onClick={() => increase(p)}>
                        🛒 Ajouter au panier
                      </button>
                    ) : (
                      <div className="cart-actions">
                        <button onClick={() => decrease(p.id)}>-</button>
                        <span>{getQty(p.id)}</span>
                        <button onClick={() => increase(p)}>+</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
