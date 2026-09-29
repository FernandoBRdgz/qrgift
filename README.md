# qrgift

Proyecto personal en Angular, publicado en GitHub Pages.

## Editar los datos

Todo lo que cambia (liga del PDF, vuelo, asientos) está en [`src/datos.json`](src/datos.json).
Edítalo desde GitHub con el icono del lápiz y guarda en `main`: el workflow vuelve a publicar el sitio en uno o dos minutos.

- `pdf.liga`: liga de Google Drive compartida como "Cualquier persona con el enlace". También acepta una ruta como `pase.pdf` si subes el archivo a `public/`.
- `pdf.modo`: `descarga` (descarga directa) o `vista` (vista previa de Drive).
- Fechas en formato `AAAA-MM-DD`. Un valor vacío se muestra como "Por confirmar".

## Desarrollo

```bash
npm install
npm start          # http://localhost:4200
npm run build      # salida en dist/qrgift/browser
```

La ruta `/tarjeta` genera la tarjeta con el QR para imprimir.
