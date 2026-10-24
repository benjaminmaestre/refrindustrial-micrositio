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
   CONFIGURACIÓN — enlaces verificados del sitio oficial
   ============================================================ */
const SITE_URL = "https://refrindustrial.com.co/";
const SERVICES_URL = "https://refrindustrial.com.co/services";
const ABOUT_URL = "https://refrindustrial.com.co/aboutUs";
const MAPS_URL = "https://maps.app.goo.gl/YH3XxW8rZnWF2NYAA";
const WHATSAPP_URL = "https://api.whatsapp.com/send?phone=573135910868";
const WHATSAPP_QR_URL = "https://wa.me/573135910868";
const INSTAGRAM_URL = "https://www.instagram.com/refrindustrial_ingenieria/";
const FACEBOOK_URL = "https://www.facebook.com/people/Refrindustrial-Ingenier%C3%ADa-SAS/61562111681966/";

/* ---------- Autoplay del carrusel (avanza solo, se pausa al tocar) ---------- */
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

const sections = [
  {
    src: "/images/seccion-instalacion.webp",
    alt: "Instalación y montaje de sistemas de refrigeración industrial",
    title: "Instalación y montaje",
    sub: "Suministro e instalación con puesta en marcha"
  },
  {
    src: "/images/seccion-diseno.webp",
    alt: "Diseño y especificación de sistemas de refrigeración industrial",
    title: "Diseño y especificación",
    sub: "Asesoría, especificación y diseño a la medida"
  },
  {
    src: "/images/seccion-mantenimiento.webp",
    alt: "Mantenimiento preventivo y correctivo de refrigeración industrial",
    title: "Mantenimiento",
    sub: "Mantenimiento preventivo y correctivo"
  }
];

const linkButtons = [
  { icon: MessageCircle, title: "WHATSAPP", sub: "Escríbenos ahora", href: WHATSAPP_URL },
  { icon: Wrench, title: "NUESTROS SERVICIOS", sub: "Conoce lo que hacemos", href: SERVICES_URL },
  { icon: Users, title: "QUIÉNES SOMOS", sub: "Conoce la empresa", href: ABOUT_URL },
  { icon: MapPin, title: "CÓMO LLEGAR", sub: "Calle 10 # 52-173, Medellín", href: MAPS_URL },
  { icon: Phone, title: "LLÁMANOS", sub: "+57 313 591 0868", href: "tel:+573135910868" },
  { icon: Instagram, title: "INSTAGRAM", sub: "Conoce nuestro trabajo", href: INSTAGRAM_URL },
  { icon: Facebook, title: "FACEBOOK", sub: "Síguenos", href: FACEBOOK_URL },
  { icon: Globe2, title: "SITIO WEB OFICIAL", sub: "refrindustrial.com.co", href: SITE_URL }
];

export default function HomePage() {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const pauseCarousel = useCarouselAutoplay(carouselRef);

  /* El video de fondo se pausa con "reducir movimiento" y con la pestaña oculta */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (reduceMotion.matches || document.hidden) {
        video.pause();
      } else {
        void video.play().catch(() => undefined);
      }
    };
    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    reduceMotion.addEventListener("change", syncPlayback);
    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      reduceMotion.removeEventListener("change", syncPlayback);
    };
  }, []);

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

  return (
    <main className="beacons-page">
      {/* FONDO EN VIDEO futurista, fijo */}
      <div className="bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="bg-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/fondo-futurista.jpg"
          src="/images/fondo-futurista.mp4"
        />
        <div className="bg-veil" />
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
          <p className="profile-name">Refrindustrial</p>
          <p className="profile-line">Refrigeración Industrial · Medellín, Colombia</p>
          <span className="fair-pill">Estamos en la feria · Visítanos</span>
          <h1>Soluciones integrales de refrigeración industrial</h1>
          <p className="tagline">
            Asesoría, suministro, montaje y mantenimiento de sistemas de refrigeración para los diferentes
            sectores industriales.
          </p>
          <p className="services-line">Diseño · Montaje · Mantenimiento</p>
        </header>

        {/* FLYER PROMOCIONAL DE FERIA (con QR a WhatsApp) */}
        <section className="flyer" aria-label="Pieza promocional de feria">
          <div className="flyer-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/flyer-foto.jpg" alt="Equipo de refrigeración industrial instalado por Refrindustrial" />
            <span className="flyer-badge" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-r.png" alt="" />
            </span>
          </div>
          <svg className="flyer-tear" viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="0,6 5,2 12,5 20,1 28,4 36,2 44,5 52,1 60,4 68,2 76,5 84,1 92,4 100,2 100,6" />
          </svg>
          <div className="flyer-body">
            <span className="flyer-logo-pill">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-horizontal.png" alt="Refrindustrial" />
            </span>
            <h2>
              FRÍO SEGURO
              <br />
              SIEMPRE
            </h2>
            <ul className="flyer-bands">
              <li>Asesoría, Especificación y Diseño</li>
              <li>Suministro e Instalación</li>
              <li>Mantenimiento preventivo y correctivo</li>
            </ul>
            <div className="flyer-qr-row">
              <a className="flyer-qr" href={WHATSAPP_QR_URL} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/qr-whatsapp.png" alt="Código QR para escribir por WhatsApp a Refrindustrial" />
                <span>Escríbenos por WhatsApp</span>
              </a>
              <p className="flyer-offer">
                <strong>OFERTA DE FERIA</strong>
                Asesoría para tu proyecto de refrigeración <strong>SIN COSTO</strong>
              </p>
            </div>
          </div>
        </section>

        {/* CARRUSEL DE SECCIONES */}
        <div className="guide">
          <h2>Conoce lo que hacemos</h2>
          <p>Desliza la imagen</p>
        </div>
        <div
          className="carousel"
          ref={carouselRef}
          onMouseDown={pauseCarousel}
          onTouchStart={pauseCarousel}
          onWheel={pauseCarousel}
        >
          {sections.map((s) => (
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

        {/* CIERRE — QUIÉNES SOMOS Y CONTACTO */}
        <section className="about">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="about-img"
            src="/images/seccion-equipo.webp"
            alt="Equipo de Refrindustrial en una sala de control de refrigeración"
            loading="lazy"
          />
          <div className="about-copy">
            <h2>¿Quiénes somos?</h2>
            <p>
              Somos una empresa dedicada a la asesoría, suministro, montaje y mantenimiento de sistemas de
              refrigeración para los diferentes sectores industriales, con los estándares de calidad y
              cumplimiento técnico que su compañía requiere.
            </p>
            <p className="about-phrase">
              Tu satisfacción es nuestra prioridad y tu experiencia memorable es nuestro compromiso.
            </p>
            <ul className="contact-list">
              <li>
                <a href="tel:+573135910868">+57 313 591 0868</a> · <a href="tel:+573127516467">+57 312 751 6467</a>{" "}
                · <a href="tel:+573103881998">+57 310 388 1998</a>
              </li>
              <li>
                <a href="mailto:gerencia@refrindustrial.com">gerencia@refrindustrial.com</a> ·{" "}
                <a href="mailto:ingenieria@refrindustrial.com">ingenieria@refrindustrial.com</a>
              </li>
              <li>Calle 10 # 52-173, Medellín</li>
            </ul>
          </div>
        </section>

        <footer className="footer">
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
