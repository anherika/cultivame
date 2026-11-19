# Cultívame

Aplicación web en React para explorar e identificar plantas comunes de México y acompañar la creación de huertos urbanos.

## Estado actual

Esta primera versión contiene el flujo base de producto:

- carga y vista previa de una fotografía;
- catálogo inicial de plantas;
- búsqueda y filtros;
- ficha de cuidados;
- guardado de plantas por cuenta;
- seguimiento de estado: viva, necesita cuidados o ya no está viva;
- conexión preparada con una Edge Function de identificación visual.

## Stack

- React
- Vite
- Supabase Auth, Database y Edge Functions
- GitHub Actions
- GitHub Pages

## Desarrollo local

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

## Supabase

La app puede conectarse a Supabase con las variables de `.env.example`:

```bash
cp .env.example .env.local
```

Después ejecuta el esquema de `docs/supabase-schema.sql` en Supabase. Las plantas guardadas se filtran por `auth.uid()` mediante RLS; si Supabase no está configurado, la app conserva un fallback local para pruebas.

### GitHub Pages

Para que la versión publicada use Supabase, crea en el repositorio:

- una variable pública `VITE_SUPABASE_URL` con la URL del proyecto;
- un secret `VITE_SUPABASE_ANON_KEY` con la clave `anon` pública.

El workflow de GitHub Actions las inyecta durante el build. En Supabase agrega `https://anherika.github.io/cultivame/` como URL de redirección permitida para Google Auth. No subas `.env.local` ni claves al repositorio.

### Identificación visual

La función `supabase/functions/identify-plant/index.ts` llama a Pl@ntNet sin exponer la clave en el navegador. Para desplegarla con Supabase CLI:

```bash
supabase functions deploy identify-plant
supabase secrets set PLANTNET_API_KEY=tu_clave
```

La clave de Pl@ntNet debe quedarse como secret del proyecto. Hasta que la función y las variables estén configuradas, la interfaz muestra un resultado de respaldo para poder probar el journey.

## Datos y seguridad

- `user_plants` usa `user_id` como dueño y RLS para impedir que una cuenta vea las plantas de otra.
- `identifications` y `care_logs` quedan listas para guardar el historial de identificaciones y cuidados.
- La clave de cualquier servicio externo permanece en el backend, nunca en el navegador.

## Fuentes de información previstas

- Pl@ntNet: identificación visual.
- GBIF e iNaturalist: taxonomía, observaciones y distribución.
- CONABIO / SIAgroBD: agrobiodiversidad mexicana.
- INIFAP: recomendaciones de cultivo.
- SENASICA: alertas fitosanitarias.

## Contexto del proyecto

Cultívame nace del proyecto de diseño de cibermedios para impulsar la creación de cultivos urbanos. La aplicación busca convertir información técnica en una experiencia clara, útil y accesible para personas que quieren cultivar en casa.

## Licencia

El código de esta primera versión se publica para prototipado y validación del proyecto Cultívame.
