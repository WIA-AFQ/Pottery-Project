import "./Atelier.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import atelierne from "./assets/images/atelierne.jpg";
import atelierne2 from "./assets/images/atelierne2.jpg";
import atelierne1 from "./assets/images/atelierne1.jpg";
import { api, errorMessage, getUser, logout as apiLogout } from "./api";
import { useNavigate } from "react-router-dom";
export default function Atelier() {
  const [sidebaropen, setsidebaropen] = useState(true);

  const images = [
     {
          id: 1,
          image: atelierne,
        },
        {
          id: 2,
          image: atelierne2,
        },
        {
          id: 3,
          price: 120,
          image:atelierne1,
        },
  ];

  const [index, setIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [atelier, setAtelier] = useState(null);
  const [reservation, setReservation] = useState(() => {
    const user = getUser();
    return { name: user?.name || "", email: user?.email || "", phone: user?.phone || "", date: "" };
  });
  const [reservationMessage, setReservationMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api("/ateliers", { auth: false })
      .then((data) => {
        if (data.length) {
          setAtelier(data[0]);
          setReservation((current) => ({ ...current, date: data[0].date }));
        }
      })
      .catch(() => setReservationMessage("Les ateliers ne sont pas disponibles pour le moment."));
  }, []);

  const submitReservation = async (e) => {
    e.preventDefault();
    setReservationMessage("");
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    if (!atelier) {
      setReservationMessage("Aucun atelier n'est disponible pour la réservation.");
      return;
    }
    try {
      await api("/reservations", {
        method: "POST",
        body: {
          atelier_id: atelier.id,
          reservation_date: reservation.date,
          nombre_places: 1,
          name: reservation.name,
          email: reservation.email,
          phone: reservation.phone,
        },
      });
      setReservationMessage("Votre réservation a été enregistrée.");
      setShowForm(false);
      alert("Votre réservation a été enregistrée.");
    } catch (err) {
      setReservationMessage(errorMessage(err));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

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

          <div className="atelier-page">

           <div className="atelier-left">
  <div className="image-slider">
    <img
      src={images[index].image}
      alt={images[index].name}
      className="slider-img"
    />
  </div>
</div>

            <div className="atelier-right">

              <div className="title-section">
                <span className="small-title">POTERIE ARTISANALE</span>
                <h1 className="main-title">WinaFakhar</h1>
                <h2 className="welcome-title">Bienvenue chez nous</h2>
              </div>

              <p className="description">
                {atelier?.description || "Découvrez l'univers authentique de la poterie marocaine..."}
              </p>

              <div className="atelier-info">
                <p><strong>Prix :</strong> {atelier?.prix ?? 150} DH / personne</p>
                <p><strong>Date :</strong> {atelier?.date || "À confirmer"} {atelier?.heure || ""}</p>
                <p><strong>Adresse :</strong> {atelier?.lieu || "Centre Artistique, Rabat"}</p>
              </div>

              <button
                className="join-btn"
                onClick={() => setShowForm(!showForm)}
              >
                Réserver maintenant
              </button>

              {showForm && (
                <form className="reservation-form" onSubmit={submitReservation}>
                  <h3>Réservation</h3>

                  {reservationMessage && <p role="alert">{reservationMessage}</p>}
                  <input type="text" placeholder="Nom complet" value={reservation.name} onChange={(e) => setReservation({ ...reservation, name: e.target.value })} required />
                  <input type="email" placeholder="Email" value={reservation.email} onChange={(e) => setReservation({ ...reservation, email: e.target.value })} required />
                  <input type="tel" placeholder="Téléphone" value={reservation.phone} onChange={(e) => setReservation({ ...reservation, phone: e.target.value })} required />
                  <input type="date" value={reservation.date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setReservation({ ...reservation, date: e.target.value })} required />

                  <button className="submit-btn" type="submit">
                    Confirmer
                  </button>
                </form>
              )}

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
