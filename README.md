# Cultívame

Aplicación web en React para explorar e identificar plantas comunes de México y acompañar la creación de huertos urbanos.

## Estado actual

Esta primera versión ya permite validar el journey completo en el navegador:

- cargar y previsualizar una fotografía;
- ejecutar un resultado preliminar de identificación;
- explorar un catálogo inicial con búsqueda y filtros;
- consultar cuidados y recomendaciones;
- guardar plantas en “Mis plantas” usando almacenamiento local;
- marcar cada planta como viva y bien, necesita cuidados o ya no está viva.

La identificación actual es un modo de prototipo: si la foto incluye el nombre de una planta en el archivo, lo usa como pista; si no, muestra el primer resultado del catálogo. Esto permite probar la experiencia sin fingir que el modelo visual ya está conectado.

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

La integración recomendada para la primera app pública es Pl@ntNet detrás de un endpoint seguro. Su plan gratuito ofrece hasta 500 identificaciones al día y devuelve especies ordenadas con confianza; la clave debe vivir en un backend o función serverless, nunca en el navegador.

Después podemos enriquecer las fichas con GBIF, iNaturalist, CONABIO, INIFAP y SENASICA. Las recomendaciones de cuidado deben pasar por una capa editorial propia para revisar que sean adecuadas para México y para huertos domésticos.

## Fuentes de información previstas

- Pl@ntNet: identificación visual.
- GBIF e iNaturalist: taxonomía, observaciones y distribución.
- CONABIO / SIAgroBD: agrobiodiversidad mexicana.
- INIFAP: recomendaciones de cultivo.
- SENASICA: alertas fitosanitarias.

## Publicación

La aplicación se publica automáticamente en GitHub Pages desde la rama `main` mediante GitHub Actions.

## Contexto del proyecto

Cultívame nace del proyecto de diseño de cibermedios para impulsar la creación de cultivos urbanos. La aplicación busca convertir información técnica en una experiencia clara, útil y accesible para personas que quieren cultivar en casa.

## Licencia

El código de esta primera versión se publica para prototipado y validación del proyecto Cultívame.
