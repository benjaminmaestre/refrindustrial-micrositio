import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import "../contacto.css";

type Exec = {
  slug: string; name: string; first: string; role: string;
  email: string; wa: string; phone: string; pos: string;
};

const EXECS: Exec[] = [
  { slug: "jorge-puerta", name: "Jorge Puerta", first: "Jorge", role: "Gerente General", email: "gerencia@refrindustrial.com", wa: "573103881998", phone: "+57 310 388 1998", pos: "50% 30%" },
  { slug: "daniel-puerta", name: "Daniel Puerta", first: "Daniel", role: "Director de Ingeniería", email: "daniel@rdc.com.co", wa: "573127516467", phone: "+57 312 751 6467", pos: "50% 42%" },
  { slug: "kamila-cardenas", name: "Kamila Cárdenas", first: "Kamila", role: "Ejecutiva Comercial", email: "comercial1@rdc.com.co", wa: "573135910868", phone: "+57 313 591 0868", pos: "50% 40%" },
  { slug: "felipe-ayala", name: "Felipe Ayala", first: "Felipe", role: "Ingeniero de Proyectos", email: "proyectos1@rdc.com.co", wa: "573005126942", phone: "+57 300 512 6942", pos: "50% 42%" },
  { slug: "julian-moreno", name: "Julian Moreno", first: "Julian", role: "Modelador BIM", email: "analistabim@rdc.com.co", wa: "573137802477", phone: "+57 313 780 2477", pos: "47% 38%" },
  { slug: "jhonatan-lujan", name: "Jhonatan Lujan", first: "Jhonatan", role: "Técnico de Refrigeración", email: "", wa: "573006248626", phone: "+57 300 624 8626", pos: "50% 38%" },
];

const ADDRESS = "Calle 10 No. 52-173 · Medellín";

function greeting(e: Exec) {
  return (
    `Hola ${e.first}, visité el stand de Refrindustrial Ingeniería en ` +
    `Territorio Aguacate 2026 y quiero más información sobre sus ` +
    `servicios de refrigeración industrial.`
  );
}

export function generateStaticParams() {
  return EXECS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = EXECS.find((x) => x.slug === slug);
  if (!e) return { title: "Contacto — Refrindustrial" };
  return {
    title: `${e.name} — ${e.role} | Refrindustrial`,
    description: `Tarjeta de contacto de ${e.name}, ${e.role} de Refrindustrial Ingeniería S.A.S. Escríbele por WhatsApp o guarda su contacto.`,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = EXECS.find((x) => x.slug === slug);
  if (!e) notFound();
  const waUrl = `https://wa.me/${e.wa}?text=${encodeURIComponent(greeting(e))}`;
  return (
    <main className="contacto-wrap">
      <section className="contacto-card">
        <img
          className="contacto-logo"
          src="/images/logo-horizontal.png"
          alt="Refrindustrial Ingeniería S.A.S."
        />
        <div className="contacto-photo-ring">
          <img
            className="contacto-photo"
            src={`/images/contacto/${e.slug}.jpg`}
            alt={`Foto de ${e.name}`}
            style={{ objectPosition: e.pos }}
          />
        </div>
        <h1 className="contacto-name">{e.name}</h1>
        <p className="contacto-role">{e.role}</p>
        <p className="contacto-company">Refrindustrial Ingeniería S.A.S.</p>
        <div className="contacto-lines">
          <p>{e.phone}</p>
          {e.email ? <p>{e.email}</p> : null}
          <p>{ADDRESS}</p>
        </div>
        <a className="contacto-btn contacto-btn-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
          Escríbeme por WhatsApp
        </a>
        <a className="contacto-btn contacto-btn-save" href={`/contactos/${e.slug}.vcf`} download>
          Guardar contacto
        </a>
        <a className="contacto-btn contacto-btn-call" href={`tel:+${e.wa}`}>
          Llamar ahora
        </a>
        <Link className="contacto-back" href="/">
          Ver el micrositio de Refrindustrial
        </Link>
      </section>
    </main>
  );
}
