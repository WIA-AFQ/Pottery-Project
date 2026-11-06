import { useEffect, useState } from "react";
import "./Panier.css";
import { Link, useNavigate } from "react-router-dom";
import { api, errorMessage, logout as apiLogout } from "./api";

export default function Panier() {
  const [sidebaropen, setsidebaropen] = useState(true);
  const [cart, setCart] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cash",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!localStorage.getItem("token")) {
      setMessage("Connectez-vous avant de confirmer votre commande.");
      return;
    }
    setSubmitting(true);
    try {
      await api("/commandes", {
        method: "POST",
        body: {
          nom_client: form.name,
          telephone: form.phone,
          adresse: form.address,
          payment_method: form.payment,
          items: cart.map((item) => ({ product_id: item.id, quantite: item.qty })),
        },
      });
      localStorage.removeItem("cart");
      setCart([]);
      setShowForm(false);
      alert("Commande confirmee");
    } catch (err) {
      setMessage(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="nav-left">
          <button
            className="menu-btn"
            onClick={() => setsidebaropen(!sidebaropen)}
          >
            ☰
          </button>

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

          <div className="panier-page">

            <div className="panier-container">

              {/* LEFT */}
              <div className="panier-left">

                <h2>TOUS LES ARTICLES ({cart.length})</h2>

                {cart.length === 0 ? (
                  <div className="empty-cart">
                    Votre panier est vide
                  </div>
                ) : (
                  cart.map((item) => (
                    <div className="cart-card" key={item.id}>

                      <img src={item.image} alt={item.name} />

                      <div className="cart-info">

                        <h3>{item.name}</h3>
                        <p className="price">{item.price} DH</p>

                        <div className="cart-bottom">

                          <select
                            className="qty-select"
                            value={item.qty}
                            onChange={(e) => {
                              const updated = cart.map((p) =>
                                p.id === item.id
                                  ? { ...p, qty: Number(e.target.value) }
                                  : p
                              );

                              setCart(updated);
                              localStorage.setItem("cart", JSON.stringify(updated));
                            }}
                          >
                            <option value="1">Qty: 1</option>
                            <option value="2">Qty: 2</option>
                            <option value="3">Qty: 3</option>
                            <option value="4">Qty: 4</option>
                            <option value="5">Qty: 5</option>
                          </select>

                          <button
                            className="delete-btn"
                            onClick={() => removeItem(item.id)}
                          >
                            🗑
                          </button>

                        </div>

                      </div>

                    </div>
                  ))
                )}
              </div>

              {/* RIGHT */}
              <div className="summary-box">

                <h2>Résumé de votre commande</h2>

                <div className="summary-row">
                  <span>Prix estimé :</span>
                  <strong>{total} DH</strong>
                </div>

                <button
                  className="checkout-btn"
                  onClick={() => {
                    if (!localStorage.getItem("token")) navigate("/login");
                    else setShowForm(true);
                  }}
                >
                  Passer au paiement
                </button>

              </div>

            </div>

          </div>

        </main>
      </div>

      {/* FORM OVERLAY */}
      {showForm && (
        <div className="overlay">

          <div className="payment-box">

            <button
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            <h2>Informations de livraison</h2>

            <form onSubmit={handleSubmit}>

              {message && <p role="alert">{message}</p>}

              <input
                type="text"
                name="name"
                placeholder="Nom complet"
                required
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Téléphone"
                required
                onChange={handleChange}
              />

              <textarea
                name="address"
                placeholder="Adresse complète"
                required
                onChange={handleChange}
              />

              <select
                name="payment"
                onChange={handleChange}
              >
                <option value="cash">Paiement à la livraison</option>
                <option value="card">Carte bancaire</option>
              </select>

              <button type="submit" disabled={submitting}>
                {submitting ? "Envoi..." : "Confirmer la commande"}
              </button>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}
