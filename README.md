# Refrindustrial — Micrositio de feria

Micrositio de una sola página tipo Beacons / Link in Bio para la feria de Refrindustrial: fondo animado futurista fijo, perfil con botón de compartir, carrusel de soluciones con avance automático, botones de enlace oscuros con efecto tilt 3D (border-radius 16px), bloque «Quiénes somos», carrusel adicional con las piezas/flyers de feria y pie mínimo. Todos los datos y enlaces son los reales de la empresa; los enlaces viven en un bloque `CONFIGURACIÓN` al inicio de `src/app/page.tsx`, fáciles de editar.

## Desarrollo local

```bash
npm install
npm run dev
```

## Preview en Vercel

Importar `benjaminmaestre/refrindustrial-micrositio` desde el panel de Vercel. Framework preset: Next.js. No requiere variables de entorno.

## Pendiente antes de publicación definitiva

- Confirmar las URLs oficiales de Instagram y Facebook para activar sus botones (`INSTAGRAM_URL` / `FACEBOOK_URL` en `src/app/page.tsx`); el resto de datos ya son los reales.
- Configurar la URL que se grabará en la tarjeta NFC / código QR del stand.
- La lectura de credenciales y captura de leads no están incluidas en esta primera fase.
