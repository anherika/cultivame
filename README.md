# Cultívame

Aplicación web en React para explorar e identificar plantas comunes de México y acompañar la creación de huertos urbanos.

## Estado actual

Esta primera versión contiene el flujo base de producto:

- carga y vista previa de una fotografía;
- catálogo inicial de plantas;
- búsqueda y filtros;
- ficha de cuidados;
- resultados de identificación simulados para validar el journey;
- estructura preparada para conectar una API real de identificación.

## Stack

- React
- Vite
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

## Próxima integración: identificación real

La arquitectura prevista separa la interfaz React de un endpoint propio que llamará a un servicio de identificación visual. La primera opción a evaluar es Pl@ntNet; después se enriquecerán los resultados con taxonomía y distribución de GBIF, iNaturalist y CONABIO.

La clave de cualquier servicio externo deberá permanecer en el backend, nunca en el navegador.

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
