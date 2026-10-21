
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://127.0.0.1:8000";

export default function App() {
  const [spots, setSpots] = useState([]);
  const [selected, setSelected] = useState(null);
  const [customer, setCustomer] = useState("");
  const [plate, setPlate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadSpots() {
    try {
      const response = await fetch(`${API}/spots`);
      if (!response.ok) throw new Error("Could not load parking spots");
      setSpots(await response.json());
      setError("");
    } catch {
      setError("Cannot connect to the backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSpots();
  }, []);

  async function reserve(event) {
    event.preventDefault();
    if (selected === null) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${API}/reservations/${selected}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customer: customer.trim(),
            plate: plate.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Reservation failed");

      setMessage(data.message);
      setSelected(null);
      setCustomer("");
      setPlate("");
      await loadSpots();
    } catch (err) {
      setError(err.message || "Reservation failed");
      await loadSpots();
    } finally {
      setSaving(false);
    }
  }

  const reservedCount = spots.filter((s) => s.reserved).length;

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-icon">P</span>
          ParkEase
        </a>
        <span className="demo-label">PARKING DEMO</span>
      </header>

      <section className="hero">
        <p className="eyebrow">SMART PARKING SYSTEM</p>
        <h1>Find your spot.<br />Park with ease.</h1>
        <p className="subtitle">
          Choose an available space and reserve it in seconds.
        </p>
      </section>

      <section className="stats">
        <article className="stat">
          <span>Total spots</span>
          <strong>{spots.length}</strong>
        </article>
        <article className="stat">
          <span>Available</span>
          <strong>{spots.length - reservedCount}</strong>
        </article>
        <article className="stat">
          <span>Reserved</span>
          <strong>{reservedCount}</strong>
        </article>
      </section>

      <section className="dashboard">
        <div className="parking-panel">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PARKING LOT A</p>
              <h2>Choose your spot</h2>
            </div>
            <button className="refresh" onClick={loadSpots}>
              Refresh
            </button>
          </div>

          <div className="legend">
            <span><i className="dot available" /> Available</span>
            <span><i className="dot occupied" /> Reserved</span>
            <span><i className="dot chosen" /> Selected</span>
          </div>

          {loading ? (
            <p>Loading parking spots...</p>
          ) : (
            <div className="spot-grid">
              {spots.map((spot) => (
                <button
                  key={spot.id}
                  className={[
                    "spot",
                    spot.reserved ? "is-reserved" : "",
                    selected === spot.id ? "is-selected" : "",
                  ].join(" ")}
                  disabled={spot.reserved || saving}
                  onClick={() => {
                    setSelected(spot.id);
                    setMessage("");
                    setError("");
                  }}
                >
                  <span className="car-icon">▤</span>
                  <strong>{spot.name}</strong>
                  <small>{spot.reserved ? "Reserved" : "Available"}</small>
                </button>
              ))}
            </div>
          )}

          <p className="parking-note">
            Select any green spot to start your reservation.
          </p>
        </div>

        <aside className="booking-panel">
          <p className="eyebrow">YOUR BOOKING</p>
          <h2>Reserve a spot</h2>

          <div className="selected-spot">
            <span>Selected parking space</span>
            <strong>
              {spots.find((s) => s.id === selected)?.name || "None selected"}
            </strong>
          </div>

          <form onSubmit={reserve}>
            <label htmlFor="customer">Full name</label>
            <input
              id="customer"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              placeholder="Enter your name"
              minLength={2}
              maxLength={80}
              required
            />

            <label htmlFor="plate">Car plate number</label>
            <input
              id="plate"
              value={plate}
              onChange={(e) => setPlate(e.target.value)}
              placeholder="e.g. ABC-1234"
              minLength={2}
              maxLength={20}
              required
            />

            <button
              className="reserve-button"
              type="submit"
              disabled={selected === null || saving}
            >
              {saving ? "Reserving..." : "Confirm reservation →"}
            </button>
          </form>

          {message && <p className="notice success">{message}</p>}
          {error && <p className="notice error">{error}</p>}

          <p className="fine-print">
            Demo only. Reservations are temporary and reset when the backend
            restarts.
          </p>
        </aside>
      </section>

      <footer>ParkEase · Parking made simple</footer>
    </main>
  );
}
