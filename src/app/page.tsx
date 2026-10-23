"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Snowflake,
  Menu,
  MessageCircle,
  Wrench,
  Settings2,
  Factory,
  ThermometerSnowflake,
  BadgeCheck,
  ChevronRight,
  Mail,
  Globe2,
  Phone,
  Instagram,
  Linkedin,
  Plus,
  X
} from "lucide-react";

const WHATSAPP_NUMBER = ""; // Pendiente: número oficial en formato internacional, sin + ni espacios.
const WHATSAPP_MESSAGE =
  "Hola, Refrindustrial. Me interesa conocer sus soluciones de refrigeración industrial.";
const COMPANY_WEBSITE = "https://www.refrindustrial.com.co/";

function whatsappUrl(message = WHATSAPP_MESSAGE) {
  if (!WHATSAPP_NUMBER) return "#contacto";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const services = [
  {
    number: "01",
    icon: ThermometerSnowflake,
    title: "Refrigeración industrial",
    detail: "Soluciones para conservar la temperatura y cuidar la continuidad de tu operación."
  },
  {
    number: "02",
    icon: Settings2,
    title: "Diseño e ingeniería",
    detail: "Sistemas pensados según las necesidades técnicas y operativas de cada proyecto."
  },
  {
    number: "03",
    icon: Wrench,
    title: "Instalación y mantenimiento",
    detail: "Montaje, puesta en marcha y acompañamiento para tus equipos de refrigeración."
  }
];

const quickLinks = [
  { label: "Visitar sitio web", detail: "Conoce más sobre Refrindustrial", href: COMPANY_WEBSITE, external: true },
  { label: "Contactar al equipo", detail: "Conversemos sobre tu proyecto", href: whatsappUrl(), external: WHATSAPP_NUMBER.length > 0 }
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <main className="site-shell">
      <div className="fixed-scene" aria-hidden="true">
        <div className="scene-photo" />
        <div className="scene-gradient" />
        <div className="scene-grid" />
      </div>

      <header className="topbar">
        <a className="brand-mark" href="#inicio" aria-label="Refrindustrial, inicio">
          <span className="brand-symbol"><Snowflake size={23} strokeWidth={1.7} /></span>
          <span className="brand-word">REFR<span>INDUSTRIAL</span></span>
        </a>
        <button className="menu-button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && (
          <nav className="menu-popover" aria-label="Navegación">
            <a href="#soluciones" onClick={() => setMenuOpen(false)}>Soluciones</a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)}>La empresa</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          </nav>
        )}
      </header>

      <section className="hero section-wrap" id="inicio">
        <div className="eyebrow"><span className="live-dot" /> INGENIERÍA · REFRIGERACIÓN · CONFIANZA</div>
        <div className="hero-copy">
          <p className="hero-kicker">SOLUCIONES PARA LA CADENA DE FRÍO</p>
          <h1>El control del frío.<br /><em>La confianza</em> en tu operación.</h1>
          <p className="hero-description">
            Ingeniería y soluciones en refrigeración industrial para operaciones que no pueden detenerse.
          </p>
        </div>
        <div className="hero-actions">
          <a className="primary-cta" href={whatsappUrl("Hola, Refrindustrial. Quiero solicitar información sobre un proyecto de refrigeración industrial.")}>
            <span className="cta-icon"><MessageCircle size={18} /></span>
            <span>Hablemos de tu proyecto<small>Atención comercial</small></span>
            <ArrowUpRight size={19} className="cta-arrow" />
          </a>
          <a className="secondary-cta" href="#soluciones">
            <span className="round-arrow"><ArrowDownRight size={18} /></span>
            Explorar soluciones
            <ChevronRight size={17} className="secondary-chevron" />
          </a>
        </div>
        <div className="hero-foot">
          <span><span className="foot-line" /> REFRIGERACIÓN INDUSTRIAL</span>
          <span>01 / 04</span>
        </div>
      </section>

      <div className="floating-content">
        <section className="intro-card glass-card section-wrap" id="nosotros">
          <div className="card-overline"><span>01</span> / REFRINDUSTRIAL</div>
          <div className="intro-grid">
            <div>
              <p className="mini-label">INGENIERÍA QUE SE SIENTE</p>
              <h2>El frío es técnico.<br /><em>La confianza, humana.</em></h2>
            </div>
            <div className="intro-text">
              <p>
                Cada operación tiene sus propios desafíos. Acompañamos a las empresas con soluciones de refrigeración industrial pensadas para sus espacios, procesos y necesidades.
              </p>
              <a className="text-link" href={COMPANY_WEBSITE} target="_blank" rel="noreferrer">
                Conoce la empresa <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="stat-strip">
            <div><span className="stat-icon"><Snowflake size={17} /></span><span>Ingeniería<small>Soluciones a la medida</small></span></div>
            <div><span className="stat-icon"><BadgeCheck size={17} /></span><span>Acompañamiento<small>De principio a operación</small></span></div>
            <div><span className="stat-icon"><Factory size={17} /></span><span>Industria<small>Enfoque técnico</small></span></div>
          </div>
        </section>

        <section className="services-section section-wrap" id="soluciones">
          <div className="section-heading">
            <div>
              <div className="card-overline"><span>02</span> / LO QUE HACEMOS</div>
              <h2>Soluciones que<br /><em>mantienen todo en marcha.</em></h2>
            </div>
            <p>Un aliado técnico para los retos de tu sistema de refrigeración.</p>
          </div>
          <div className="service-list">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isOpen = expanded === index;
              return (
                <article className={`service-card glass-card ${isOpen ? "is-open" : ""}`} key={service.number}>
                  <button className="service-trigger" onClick={() => setExpanded(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span className="service-icon"><Icon size={21} strokeWidth={1.6} /></span>
                    <span className="service-text"><small>{service.number} / SERVICIO</small><strong>{service.title}</strong></span>
                    <span className="service-plus">{isOpen ? <X size={18} /> : <Plus size={18} />}</span>
                  </button>
                  {isOpen && <p className="service-detail">{service.detail}</p>}
                </article>
              );
            })}
          </div>
        </section>

        <section className="feature-card section-wrap">
          <div className="feature-image" role="img" aria-label="Equipos industriales de refrigeración" />
          <div className="feature-overlay" />
          <div className="feature-content">
            <p className="mini-label">PRECISIÓN EN CADA DETALLE</p>
            <h2>Tu operación<br />merece un frío<br /><em>bien pensado.</em></h2>
            <a className="feature-link" href={whatsappUrl("Hola, Refrindustrial. Quiero conversar sobre una solución de refrigeración.")}>
              Conversemos <ArrowUpRight size={17} />
            </a>
          </div>
          <span className="feature-index">REFRIGERACIÓN / 03</span>
        </section>

        <section className="contact-section section-wrap" id="contacto">
          <div className="contact-panel glass-card">
            <div className="card-overline"><span>03</span> / PRÓXIMO PASO</div>
            <p className="mini-label">HABLEMOS DE TU PROYECTO</p>
            <h2>¿Qué necesitas<br /><em>mantener en frío?</em></h2>
            <p className="contact-copy">Cuéntanos qué tienes en mente. El equipo de Refrindustrial puede ayudarte a explorar la solución adecuada.</p>
            <a className="contact-cta" href={whatsappUrl("Hola, Refrindustrial. Quisiera recibir asesoría para un proyecto de refrigeración industrial.")}>
              <MessageCircle size={19} />
              Solicitar información
              <ArrowUpRight size={18} />
            </a>
            <div className="contact-links">
              <a href={COMPANY_WEBSITE} target="_blank" rel="noreferrer"><Globe2 size={16} /> Sitio web <ArrowUpRight size={13} /></a>
              <a href="mailto:"><Mail size={16} /> Correo electrónico</a>
            </div>
          </div>
        </section>

        <footer className="footer section-wrap">
          <div className="footer-brand">
            <span className="brand-symbol"><Snowflake size={21} /></span>
            <div><strong>REFRINDUSTRIAL</strong><small>INGENIERÍA Y REFRIGERACIÓN</small></div>
          </div>
          <p>Soluciones para la cadena de frío.</p>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Refrindustrial</span>
            <span>Diseñado para conectar.</span>
          </div>
        </footer>
      </div>

      <a className="floating-whatsapp" href={whatsappUrl()} aria-label="Contactar a Refrindustrial por WhatsApp">
        <MessageCircle size={21} />
        <span>Hablemos</span>
      </a>
    </main>
  );
}
