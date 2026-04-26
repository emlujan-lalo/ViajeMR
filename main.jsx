import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  CheckCircle2,
  Circle,
  KeyRound,
  Utensils,
  Shirt,
  Wrench,
  MapPin,
  CalendarDays,
  BedDouble,
} from "lucide-react";
import "./style.css";

function HospedajeMaraRosaApp() {
  const [checked, setChecked] = useState({});

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sections = [
    {
      title: "Acceso y salida",
      icon: KeyRound,
      items: [
        "Retirar llaves en la portería de la oficina Hochschild, Rua Galeno Paranhos.",
        "Al finalizar la estadía, dejar las llaves dentro de la habitación.",
      ],
    },
    {
      title: "Alimentación",
      icon: Utensils,
      items: [
        "Desayuno: entrega en el alojamiento, tipo box lunch individual.",
        "Almuerzo: 11:00 a 13:30 en el comedor de la oficina Hochschild.",
        "Cena: 18:30 a 20:00 en el comedor de la oficina Hochschild.",
      ],
    },
    {
      title: "Lavandería",
      icon: Shirt,
      items: [
        "Recojo de ropa: lunes y jueves.",
        "Entrega de ropa limpia: martes y viernes.",
        "Dejar ropa embalada, visible y con la hoja de control completada.",
      ],
    },
    {
      title: "Soporte Facilities",
      icon: Wrench,
      items: [
        "Escanear el código QR ante cualquier problema o necesidad de reparación.",
        "La solicitud generará una Orden de Servicio para atención de Facilities.",
      ],
    },
  ];

  const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
  const completed = Object.values(checked).filter(Boolean).length;
  const progress = Math.round((completed / totalItems) * 100);

  return (
    <div className="page">
      <div className="container">
        <header className="header-card">
          <p className="subtitle">Hochschild Mining Brasil</p>
          <h1>Hospedaje Mara Rosa</h1>
          <p className="description">Checklist práctico para tu estadía corporativa.</p>
          <div className="progress-box">
            <span>{progress}% completado</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </header>

        <section className="info-grid">
          <InfoCard icon={MapPin} label="Lugar" value="Chácara" />
          <InfoCard icon={BedDouble} label="Habitación" value="AP07" />
          <InfoCard icon={CalendarDays} label="Estadía" value="27/04/2026 al 30/04/2026" />
        </section>

        <main className="sections">
          {sections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <section className="section-card" key={section.title}>
                <div className="section-title">
                  <div className="icon-box">
                    <Icon size={24} />
                  </div>
                  <h2>{section.title}</h2>
                </div>

                <div className="items">
                  {section.items.map((item, itemIndex) => {
                    const id = `${sectionIndex}-${itemIndex}`;
                    const isChecked = checked[id];

                    return (
                      <button
                        key={id}
                        className={`check-item ${isChecked ? "checked" : ""}`}
                        onClick={() => toggle(id)}
                      >
                        {isChecked ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </main>

        <section className="recommendation-card">
          <h2>Recomendación rápida</h2>
          <p>
            El primer día ubica la portería, el comedor y toma foto del QR de Facilities para reportar cualquier incidencia sin depender de WhatsApp.
          </p>
          <button className="main-button">Guardar checklist</button>
        </section>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="info-card">
      <Icon size={26} />
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<HospedajeMaraRosaApp />);
