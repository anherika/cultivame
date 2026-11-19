# Mapa de producto — Cultívame

## Propósito

Ayudar a una persona en México a reconocer una planta, entender sus cuidados y darle seguimiento en casa.

## North star

**De una foto a una planta cuidada.**

La identificación no es el producto completo: es la entrada a un ciclo de aprendizaje y cuidado.

## Journey principal

| Etapa | Necesidad de la persona | Experiencia | Resultado |
|---|---|---|---|
| Descubrir | “¿Qué es esta planta?” | Inicio y catálogo | Decide subir una foto |
| Identificar | “Quiero saber qué encontré” | Carga, vista previa y análisis | Especie probable + confianza |
| Entender | “¿Qué significa y cómo la cuido?” | Ficha de planta | Cuidados y recomendaciones |
| Guardar | “No quiero perder esta información” | Mis plantas | Planta asociada a su cuenta |
| Acompañar | “Quiero saber si está bien” | Estado, notas y revisiones | Viva / necesita cuidados / muerta |
| Aprender | “Quiero mejorar mi huerto” | Historial y contenido local | Hábitos y decisiones futuras |

## Mapa de pantallas

```mermaid
flowchart TD
  A[Inicio / Explorar] --> B[Subir fotografía]
  B --> C[Resultado de identificación]
  C --> D[Ficha y recomendaciones]
  D --> E[Guardar en Mis plantas]
  E --> F[Seguimiento de salud]
  A --> G[Catálogo mexicano]
  G --> D
```

## Mapa técnico

| Capa | Responsabilidad | Primera versión |
|---|---|---|
| React + Vite | Interfaz, estados y journey | GitHub Pages |
| API serverless | Ocultar claves y coordinar servicios | `/api/identify` |
| Identificación | Especie probable y confianza | Pl@ntNet |
| Datos botánicos | Taxonomía y distribución | GBIF / iNaturalist |
| Recomendaciones | Cuidados para México | Catálogo editorial propio |
| Persistencia | Plantas, estados y notas | Supabase |

## Contrato inicial de API

### `POST /api/identify`

Entrada:

```json
{
  "image": "multipart/form-data",
  "organ": "auto",
  "location": "Puebla, MX"
}
```

Salida:

```json
{
  "identificationId": "id",
  "plant": {
    "commonName": "Bugambilia",
    "scientificName": "Bougainvillea glabra"
  },
  "confidence": 0.86,
  "alternatives": [],
  "recommendations": [],
  "source": "plantnet"
}
```

## Modelo de datos inicial

- `plants`: especie, nombres comunes, categoría, descripción y cuidados.
- `recommendations`: acción, frecuencia, temporada, fuente y revisión editorial.
- `identifications`: fecha, especie, confianza y fuente; no guardar foto por defecto.
- `user_plants`: usuario, planta, estado, fecha de alta y última revisión.
- `care_logs`: estado, nota, fecha y cambio observado.

## Alcance del MVP

### Incluido

- Catálogo inicial de especies mexicanas.
- Carga y vista previa de imagen.
- Identificación conectada a un endpoint seguro.
- Confianza y alternativas.
- Recomendaciones editoriales.
- Guardar plantas.
- Estado de salud y notas básicas.

### Después del MVP

- Login con Google.
- Sincronización entre dispositivos.
- Recordatorios de riego.
- Historial fotográfico.
- Alertas fitosanitarias y noticias.
- Identificación de enfermedades.

## Métricas de validación

- Porcentaje de personas que completan una identificación.
- Tiempo desde “subir foto” hasta “ver resultado”.
- Porcentaje que guarda la planta.
- Porcentaje que vuelve a revisar una planta.
- Identificaciones con confianza baja.
- Errores o correcciones reportadas por la comunidad.

## Decisiones pendientes

1. Elegir proveedor serverless: Cloudflare Workers, Vercel Functions o Netlify Functions.
2. Crear cuenta y API key de Pl@ntNet.
3. Definir las primeras 30–50 plantas mexicanas.
4. Decidir si el login entra en el MVP o después de las primeras pruebas.
5. Definir qué recomendaciones requieren revisión de una fuente experta.
