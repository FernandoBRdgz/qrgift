# qrgift

Proyecto personal en Angular, publicado en GitHub Pages.

## Editar los datos

Los datos del vuelo y los asientos están en [`src/datos.json`](src/datos.json).
Edítalo desde GitHub con el icono del lápiz y guarda en `main`: el workflow vuelve a publicar el sitio en uno o dos minutos.

- Fechas en formato `AAAA-MM-DD`. Un valor vacío se muestra como "Por confirmar".

## Desarrollo

```bash
npm install
npm start          # http://localhost:4200
npm run build      # salida en dist/qrgift/browser
```

La ruta `/tarjeta` genera la tarjeta con el QR para imprimir.
