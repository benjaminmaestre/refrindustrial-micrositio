"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Snowflake,
  MessageCircle,
  Wrench,
  Settings2,
  Factory,
  ThermometerSnowflake,
  ChevronDown,
  Plus,
  X,
  Globe2,
  Mail,
  Phone,
  Instagram,
  Linkedin
} from "lucide-react";

const WHATSAPP_NUMBER = "";
const COMPANY_WEBSITE = "https://www.refrindustrial.com.co/";

function whatsappUrl(message: string) {
  if (!WHATSAPP_NUMBER) return "#contacto";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const services = [
  ["Refrigeración industrial", "Soluciones para mantener tus procesos bajo control.", ThermometerSnowflake],
  ["Diseño e ingeniería", "Sistemas pensados para las necesidades de cada operación.", Settings2],
  ["Instalación y mantenimiento", "Acompañamiento técnico antes, durante y después.", Wrench]
] as const;

export default function HomePage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="beacons-page">
      <div className="beacons-bg" aria-hidden="true">
        <div className="beacons-bg-image" />
        <div className="beacons-bg-shade" />
      </div>

      <div className="mobile-canvas">
        <header className="profile-head">
          <div className="profile-photo"><Snowflake size={38} strokeWidth={1.45} /></div>
          <h1>REFRINDUSTRIAL</h1>
          <p>Refrigeración industrial · Ingeniería · Servicio</p>
          <div className="social-row">
            <a href={COMPANY_WEBSITE} target="_blank" rel="noreferrer" aria-label="Sitio web"><Globe2 size={17} /></a>
            <a href="mailto:" aria-label="Correo"><Mail size={17} /></a>
            <a href="#contacto" aria-label="Teléfono"><Phone size={17} /></a>
            <a href={COMPANY_WEBSITE} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
            <a href={COMPANY_WEBSITE} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a>
          </div>
        </header>

        <section className="link-stack">
          <a className="beacon-link featured" href={whatsappUrl("Hola, Refrindustrial. Quiero hablar sobre un proyecto de refrigeración industrial.")}>
            <span className="link-icon"><MessageCircle size={19} /></span>
            <span><strong>Habla con Refrindustrial</strong><small>Solicita información sobre tu proyecto</small></span>
            <ArrowUpRight size={18} />
          </a>

          <a className="beacon-link" href={COMPANY_WEBSITE} target="_blank" rel="noreferrer">
            <span className="link-icon"><Globe2 size={18} /></span>
            <span><strong>Sitio web</strong><small>Conoce más sobre nosotros</small></span>
            <ArrowUpRight size={18} />
          </a>

          <a className="beacon-link" href="#soluciones">
            <span className="link-icon"><Factory size={18} /></span>
            <span><strong>Soluciones de refrigeración</strong><small>Ingeniería para la cadena de frío</small></span>
            <ChevronDown size={18} />
          </a>
        </section>

        <section className="content-card" id="soluciones">
          <div className="card-label">REFRINDUSTRIAL</div>
          <h2>El frío es técnico.<br /><em>La confianza también.</em></h2>
          <p>Soluciones de refrigeración industrial para operaciones que necesitan precisión, continuidad y respaldo técnico.</p>
          <div className="mini-stats">
            <span><Snowflake size={15} /> Ingeniería</span>
            <span><Factory size={15} /> Industria</span>
            <span><Wrench size={15} /> Servicio</span>
          </div>
        </section>

        <section className="services-card">
          <div className="section-top">
            <div><span>01</span><small>SERVICIOS</small></div>
            <p>Lo que hacemos</p>
          </div>
          <div className="accordion-list">
            {services.map(([title, detail, Icon], index) => {
              const isOpen = open === index;
              return (
                <div className={`accordion ${isOpen ? "active" : ""}`} key={title}>
                  <button onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span className="service-icon"><Icon size={18} /></span>
                    <strong>{title}</strong>
                    <span className="service-toggle">{isOpen ? <X size={16} /> : <Plus size={16} />}</span>
                  </button>
                  {isOpen && <p>{detail}</p>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="image-card">
          <div className="image-card-bg" />
          <div className="image-card-shade" />
          <div className="image-card-copy">
            <small>PRECISIÓN · CONTINUIDAD · CONFIANZA</small>
            <h2>Refrigeración<br /><em>bien pensada.</em></h2>
          </div>
        </section>

        <section className="contact-card" id="contacto">
          <div className="card-label">02 / CONTACTO</div>
          <h2>Hablemos de<br /><em>tu proyecto.</em></h2>
          <p>Estamos listos para conocer tu necesidad y orientarte hacia una solución.</p>
          <a className="contact-button" href={whatsappUrl("Hola, Refrindustrial. Quiero recibir asesoría sobre refrigeración industrial.")}>
            <MessageCircle size={18} />
            Solicitar información
            <ArrowUpRight size={17} />
          </a>
          <div className="contact-meta"><span>REFRIGERACIÓN INDUSTRIAL</span><span>MEDELLÍN · COLOMBIA</span></div>
        </section>

        <footer>
          <div className="footer-logo"><Snowflake size={18} /><strong>REFRINDUSTRIAL</strong></div>
          <p>Ingeniería y soluciones para la cadena de frío.</p>
          <div>© {new Date().getFullYear()} Refrindustrial</div>
        </footer>
      </div>
    </main>
  );
}
