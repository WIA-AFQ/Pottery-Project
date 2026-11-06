import { useState } from "react";
import "./Cadeaux.css";
import { Link } from "react-router-dom";
import cadeaux from "./assets/images/cadeaux.png";
import cadeaux1 from "./assets/images/cadeaux1.png";
import cadeaux2 from "./assets/images/cadeaux2.png";
import { api, errorMessage, logout as apiLogout } from "./api";
export default function CadeauxEntreprise() {
  const [sidebaropen, setsidebaropen] = useState(true);
  const produits = [
    {
      id: 1,
      image: cadeaux ,
    },
    {
      id: 2,
      image: cadeaux1,
    },
     {
      id: 3,
      image:cadeaux2,
    },
 
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500",
    },
   
 
  ];

  const [start, setStart] = useState(0);

  const suivant = () => {
    setStart((prev) => (prev + 1) % produits.length);
  };

  const precedent = () => {
    setStart((prev) => (prev - 1 + produits.length) % produits.length);
  };

  const visibles = [
    produits[start],
    produits[(start + 1) % produits.length],
    produits[(start + 2) % produits.length],
  ];
  // FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormMessage("");
    try {
      await api("/contact", { method: "POST", auth: false, body: form });
      setForm({ name: "", email: "", message: "" });
      setFormMessage("Votre message a été envoyé.");
    } catch (err) {
      setFormMessage(errorMessage(err));
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
    <section className="cadeaux">
      <div className="slider-container">

        <button className="btn-slide left" onClick={precedent}>
          ❮
        </button>

        <div className="images-container">
          {visibles.map((item) => (
            <div key={item.id} className="image-card">
              <img src={item.image} alt="" />
            </div>
          ))}
        </div>

        <button className="btn-slide right" onClick={suivant}>
          ❯
        </button>

      </div>

      <h2>CADEAUX D’ENTREPRISE</h2>

      <p>
        Poterie WINAFAKHAR est ravi de présenter son catalogue de coffrets
        cadeaux d’exception, entièrement faits à la main, pour toutes
        sortes d’occasions et d’événements.
      </p>
        {/* ===== FORMULAIRE ===== */}
      <section className="form-section">
        <h2>CONTACTEZ-NOUS</h2>

        <form onSubmit={handleSubmit} className="form">

          {formMessage && <p role="status">{formMessage}</p>}

          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Votre message"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Envoyer</button>

        </form>
      </section>
    </section>
    </div>

          </div>

     
  );
}
