"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  MessageCircle,
  Wrench,
  Users,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Globe2,
  Share2,
  X,
  Copy,
  Check,
  Mail,
  MoreHorizontal
} from "lucide-react";

/* ============================================================
   CONFIGURACIÓN — todos los enlaces viven aquí, fáciles de editar
   ============================================================ */
const SITE_URL = "https://refrindustrial.com.co/";
const SERVICES_URL = "https://refrindustrial.com.co/services";
const ABOUT_URL = "https://refrindustrial.com.co/aboutUs";
const MAPS_URL = "https://maps.app.goo.gl/YH3XxW8rZnWF2NYAA";
const PHONE_NUMBER = "+57 313 591 0868";
const WHATSAPP_FAIR =
  "https://api.whatsapp.com/send?phone=573135910868&text=" +
  encodeURIComponent("Hola, vengo de la feria y quiero una asesoría sin costo para mi proyecto de refrigeración.");
const WHATSAPP_MAINTENANCE =
  "https://api.whatsapp.com/send?phone=573135910868&text=" +
  encodeURIComponent("Hola, vengo de la feria y quiero agendar una visita de mantenimiento.");
/* Redes sociales oficiales: se llenan solo con la URL verificada en el sitio oficial */
const INSTAGRAM_URL = "";
const FACEBOOK_URL = "";

/* ---------- Autoplay para carruseles (avanza solo, se pausa al tocar) ---------- */
function useCarouselAutoplay(ref: React.RefObject<HTMLDivElement | null>) {
  const paused = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      const step = el.clientWidth * 0.88;
      const max = el.scrollWidth - el.clientWidth - 8;
      if (el.scrollLeft >= max) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3600);
    return () => window.clearInterval(id);
  }, [ref]);

  const pause = () => {
    paused.current = true;
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      paused.current = false;
    }, 5000);
  };
  return pause;
}

/* ---------- Efecto tilt 3D de los botones (como en Beacons) ---------- */
function tiltMove(e: ReactMouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width - 0.5;
  const py = (e.clientY - r.top) / r.height - 0.5;
  el.dataset.rx = (-py * 8).toFixed(2);
  el.dataset.ry = (px * 8).toFixed(2);
  el.classList.add("tilt-live");
  el.style.transform = `perspective(700px) rotateX(${el.dataset.rx}deg) rotateY(${el.dataset.ry}deg)`;
}
function tiltLeave(e: ReactMouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  el.classList.remove("tilt-live");
  el.style.transform = "";
}
function tiltDown(e: ReactMouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  el.style.transform = `perspective(700px) rotateX(${el.dataset.rx ?? 0}deg) rotateY(${el.dataset.ry ?? 0}deg) scale(0.98)`;
}
function tiltUp(e: ReactMouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  if (el.dataset.rx) {
    el.style.transform = `perspective(700px) rotateX(${el.dataset.rx}deg) rotateY(${el.dataset.ry}deg)`;
  }
}

const solutions = [
  {
    src: "/images/solucion-instalacion.webp",
    alt: "Instalaciones industriales de sistemas de refrigeración",
    title: "Instalación y montaje",
    sub: "Suministro e instalación de sistemas de refrigeración industrial"
  },
  {
    src: "/images/solucion-diseno.webp",
    alt: "Especificación técnica y diseño de sistemas de refrigeración",
    title: "Diseño y especificación",
    sub: "Asesoría, especificación y diseño a la medida de tu operación"
  },
  {
    src: "/images/solucion-servicios.webp",
    alt: "Soluciones integrales de refrigeración: montaje, diseño y gerencia de mantenimiento",
    title: "Mantenimiento",
    sub: "Mantenimiento preventivo y correctivo para que nunca pares"
  }
];

const flyers = [
  {
    src: "/images/flyer-portada.png",
    alt: "Refrindustrial — Refrigeración industrial, frío seguro siempre",
    label: "Portada general",
    href: WHATSAPP_FAIR
  },
  {
    src: "/images/flyer-diseno.png",
    alt: "Refrindustrial — Diseño y auditoría de sistemas de refrigeración",
    label: "Diseño y auditoría",
    href: SERVICES_URL
  },
  {
    src: "/images/flyer-mantenimiento.png",
    alt: "Refrindustrial — Mantenimiento preventivo y correctivo de refrigeración industrial",
    label: "Mantenimiento",
    href: WHATSAPP_MAINTENANCE
  }
];

const particles = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 47) % 100}%`,
  size: 2 + (i % 3) * 2,
  delay: `${(i % 11) * 1.7}s`,
  duration: `${11 + (i % 7) * 3}s`,
  opacity: 0.25 + (i % 5) * 0.12
}));

export default function HomePage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const flyersRef = useRef<HTMLDivElement>(null);
  const pauseSolutions = useCarouselAutoplay(solutionsRef);
  const pauseFlyers = useCarouselAutoplay(flyersRef);

  useEffect(() => {
    if (!shareOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShareOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shareOpen]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const linkButtons = [
    { icon: MessageCircle, title: "WHATSAPP", sub: "Asesoría sin costo en feria", href: WHATSAPP_FAIR },
    { icon: Wrench, title: "NUESTROS SERVICIOS", sub: "Conoce todo lo que hacemos", href: SERVICES_URL },
    { icon: Users, title: "QUIÉNES SOMOS", sub: "Conoce la empresa", href: ABOUT_URL },
    { icon: MapPin, title: "CÓMO LLEGAR", sub: "Calle 10 # 52-173, Medellín", href: MAPS_URL },
    { icon: Phone, title: "LLAMAR AHORA", sub: PHONE_NUMBER, href: "tel:+573135910868" },
    ...(INSTAGRAM_URL
      ? [{ icon: Instagram, title: "INSTAGRAM", sub: "Conoce nuestro trabajo", href: INSTAGRAM_URL }]
      : []),
    ...(FACEBOOK_URL
      ? [{ icon: Facebook, title: "FACEBOOK", sub: "Síguenos", href: FACEBOOK_URL }]
      : []),
    { icon: Globe2, title: "SITIO WEB OFICIAL", sub: "refrindustrial.com.co", href: SITE_URL }
  ];

  return (
    <main className="beacons-page">
      {/* FONDO ANIMADO fijo, futurista */}
      <div className="bg" aria-hidden="true">
        <div className="bg-photo" />
        <div className="bg-glow bg-glow-a" />
        <div className="bg-glow bg-glow-b" />
        <div className="bg-grid" />
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
        <div className="bg-shade" />
      </div>

      <div className="column">
        {/* ENCABEZADO / PERFIL */}
        <header className="profile">
          <button className="share-btn" onClick={() => setShareOpen(true)} aria-label="Compartir">
            <Share2 size={19} />
          </button>
          <div className="avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-r.png" alt="Refrindustrial" />
          </div>
          <h1>REFRINDUSTRIAL</h1>
          <p className="profile-sub">REFRIGERACIÓN INDUSTRIAL</p>
          <p className="profile-line">Asesoría · Suministro · Montaje · Mantenimiento</p>
        </header>

        {/* TEXTO GUÍA + CARRUSEL DE SOLUCIONES */}
        <p className="guide">NUESTRAS SOLUCIONES — DESLIZA LA IMAGEN</p>
        <div
          className="carousel"
          ref={solutionsRef}
          onMouseDown={pauseSolutions}
          onTouchStart={pauseSolutions}
          onWheel={pauseSolutions}
        >
          {solutions.map((s) => (
            <figure className="slide" key={s.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.alt} loading="lazy" />
              <figcaption>
                <strong>{s.title}</strong>
                <span>{s.sub}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* BOTONES DE ENLACE estilo Beacons */}
        <nav className="link-stack" aria-label="Enlaces principales">
          {linkButtons.map((b) => {
            const Icon = b.icon;
            const external = b.href.startsWith("http");
            return (
              <a
                key={b.title}
                className="btn"
                href={b.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
                onMouseDown={tiltDown}
                onMouseUp={tiltUp}
              >
                <span className="btn-icon">
                  <Icon size={23} />
                </span>
                <span className="btn-text">
                  <strong>{b.title}</strong>
                  <small>{b.sub}</small>
                </span>
                <span className="btn-more" aria-hidden="true">
                  <MoreHorizontal size={19} />
                </span>
              </a>
            );
          })}
        </nav>

        {/* QUIÉNES SOMOS */}
        <section className="about">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="about-img"
            src="/images/quienes-somos.webp"
            alt="Soluciones integrales de refrigeración — Refrindustrial"
            loading="lazy"
          />
          <div className="about-copy">
            <h2>¿QUIÉNES SOMOS?</h2>
            <p>
              Somos una empresa dedicada a la asesoría, suministro, montaje y mantenimiento de sistemas de
              refrigeración para los diferentes sectores industriales, con los estándares de calidad y
              cumplimiento técnico que su compañía requiere.
            </p>
          </div>
        </section>

        {/* PIEZAS DE FERIA — los flyers, además de las imágenes de arriba */}
        <p className="guide">PIEZAS DE FERIA — DESLIZA LA IMAGEN</p>
        <div
          className="carousel flyer-carousel"
          ref={flyersRef}
          onMouseDown={pauseFlyers}
          onTouchStart={pauseFlyers}
          onWheel={pauseFlyers}
        >
          {flyers.map((f) => (
            <a
              className="slide flyer-slide"
              key={f.src}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={f.label}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt={f.alt} loading="lazy" />
            </a>
          ))}
        </div>

        {/* CIERRE + PIE */}
        <section className="closing">
          <h2>PROTEGEMOS TU CADENA DE FRÍO</h2>
          <p>
            Asesoría, suministro, montaje y mantenimiento de sistemas de refrigeración industrial, con los
            estándares de calidad que tu compañía requiere.
          </p>
        </section>
        <footer className="footer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-horizontal.png" alt="Refrindustrial" />
          <p>Refrindustrial · Calle 10 # 52-173, Medellín · +57 313 591 0868</p>
        </footer>
      </div>

      {/* DIÁLOGO DE COMPARTIR */}
      {shareOpen && (
        <div className="share-backdrop" onClick={() => setShareOpen(false)}>
          <div
            className="share-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Compartir Refrindustrial"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="share-close" onClick={() => setShareOpen(false)} aria-label="Cerrar">
              <X size={18} />
            </button>
            <h3>Compartir</h3>
            <p>Refrindustrial — Refrigeración Industrial</p>
            <div className="share-options">
              <a
                href={`https://wa.me/?text=${encodeURIComponent("Refrindustrial — Refrigeración Industrial " + SITE_URL)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={19} /> WhatsApp
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={19} /> Facebook
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("Refrindustrial — Refrigeración Industrial")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 size={19} /> X
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent("Refrindustrial — Refrigeración Industrial")}&body=${encodeURIComponent(SITE_URL)}`}
              >
                <Mail size={19} /> Correo
              </a>
              <button onClick={copyLink}>
                {copied ? <Check size={19} /> : <Copy size={19} />}
                {copied ? "¡Enlace copiado!" : "Copiar enlace"}
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
