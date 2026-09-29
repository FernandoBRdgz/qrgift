import QRCodeStyling from 'qr-code-styling';

export interface Imagenes {
  /** Tarjeta de 1200×1800 px: 4×6 in a 300 dpi. */
  tarjeta: string;
  /** Solo el QR, 1160×1160 px. */
  qr: string;
}

const CREMA = '#F7EFE2';
const CAFE = '#3F2A1D';
const ORO = '#8A6424';
const LINEA = '#B08A45';
const TINTA = '#2A1C13';

/** Genera la tarjeta y el QR solo, como data URLs PNG. */
export async function generarImagenes(url: string): Promise<Imagenes> {
  await Promise.all([
    document.fonts.load('italic 600 100px "Bodoni Moda"'),
    document.fonts.load('italic 400 100px "Bodoni Moda"'),
    document.fonts.load('40px "Special Elite"'),
    document.fonts.load('500 30px "Jost"'),
    document.fonts.load('400 30px "Jost"'),
  ]);

  const qr = new QRCodeStyling({
    width: 1000,
    height: 1000,
    type: 'canvas',
    data: url,
    margin: 0,
    qrOptions: { errorCorrectionLevel: 'H' },
    image: hueco(),
    imageOptions: { hideBackgroundDots: true, imageSize: 0.26, margin: 10, crossOrigin: 'anonymous' },
    dotsOptions: {
      type: 'rounded',
      gradient: { type: 'linear', rotation: Math.PI / 4, colorStops: [{ offset: 0, color: ORO }, { offset: 1, color: CAFE }] },
    },
    cornersSquareOptions: { type: 'extra-rounded', color: CAFE },
    cornersDotOptions: { type: 'dot', color: ORO },
    backgroundOptions: { color: CREMA },
  });
  const img = await aImagen((await qr.getRawData('png')) as Blob);

  // Solo el QR, con el sello al centro
  const q = lienzo(1160, 1160);
  q.g.fillStyle = CREMA;
  q.g.fillRect(0, 0, 1160, 1160);
  q.g.drawImage(img, 80, 80, 1000, 1000);
  sello(q.g, 580, 580, 112);

  // Tarjeta
  const { c, g } = lienzo(1200, 1800);
  const fondo = g.createRadialGradient(600, 800, 200, 600, 900, 1100);
  fondo.addColorStop(0, CREMA);
  fondo.addColorStop(1, '#EBDCC4');
  g.fillStyle = fondo;
  g.fillRect(0, 0, 1200, 1800);

  g.strokeStyle = LINEA;
  g.lineWidth = 4;
  g.strokeRect(48, 48, 1104, 1704);
  g.lineWidth = 1.5;
  g.strokeRect(66, 66, 1068, 1668);
  // Abanicos art déco en las esquinas
  const esquinas: [number, number, number, number][] = [
    [66, 66, 0, 0.5 * Math.PI],
    [1134, 66, 0.5 * Math.PI, Math.PI],
    [66, 1734, 1.5 * Math.PI, 2 * Math.PI],
    [1134, 1734, Math.PI, 1.5 * Math.PI],
  ];
  for (const [x, y, a0, a1] of esquinas) {
    for (let i = 1; i <= 3; i++) {
      g.beginPath();
      g.arc(x, y, 26 * i, a0, a1);
      g.stroke();
    }
  }

  g.textAlign = 'center';
  g.textBaseline = 'alphabetic';
  g.fillStyle = ORO;
  g.font = '500 30px "Jost", sans-serif';
  espaciado(g, 'PARA BREN', 600, 220, 12);

  g.fillStyle = TINTA;
  g.font = 'italic 400 132px "Bodoni Moda", Georgia, serif';
  g.fillText('Feliz', 600, 380);
  g.fillText('cumpleaños', 600, 510);

  g.fillStyle = LINEA;
  g.fillRect(470, 566, 100, 2);
  g.fillRect(630, 566, 100, 2);
  g.save();
  g.translate(600, 567);
  g.rotate(Math.PI / 4);
  g.fillRect(-9, -9, 18, 18);
  g.restore();

  g.fillStyle = CREMA;
  g.strokeStyle = LINEA;
  g.lineWidth = 2;
  g.beginPath();
  g.roundRect(200, 620, 800, 800, 36);
  g.fill();
  g.stroke();
  g.drawImage(img, 240, 660, 720, 720);
  sello(g, 600, 1020, 82);

  g.fillStyle = TINTA;
  g.font = '58px "Special Elite", "Courier New", monospace';
  g.fillText('Escanéame', 600, 1530);
  g.fillStyle = ORO;
  g.font = '400 32px "Jost", sans-serif';
  g.fillText('cuando estés lista', 600, 1590);

  g.fillStyle = LINEA;
  [540, 600, 660].forEach((x, i) => {
    g.beginPath();
    g.arc(x, 1672, i === 1 ? 5 : 3, 0, Math.PI * 2);
    g.fill();
  });

  return { tarjeta: c.toDataURL('image/png'), qr: q.c.toDataURL('image/png') };
}

function lienzo(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { c, g: c.getContext('2d')! };
}

/** Círculo crema que deja libre el centro del QR para el sello. */
function hueco(): string {
  const { c, g } = lienzo(200, 200);
  g.fillStyle = CREMA;
  g.beginPath();
  g.arc(100, 100, 98, 0, Math.PI * 2);
  g.fill();
  return c.toDataURL('image/png');
}

/** Sello de lacre dorado con la "B". */
function sello(g: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  const gr = g.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.1, x, y, r);
  gr.addColorStop(0, '#F3DDA0');
  gr.addColorStop(0.5, '#C9A45C');
  gr.addColorStop(1, ORO);
  g.fillStyle = gr;
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = 'rgba(74,50,36,.55)';
  g.lineWidth = r * 0.03;
  g.setLineDash([r * 0.06, r * 0.05]);
  g.beginPath();
  g.arc(x, y, r * 0.82, 0, Math.PI * 2);
  g.stroke();
  g.setLineDash([]);
  g.fillStyle = TINTA;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.font = `italic 600 ${Math.round(r * 1.15)}px "Bodoni Moda", Georgia, serif`;
  g.fillText('B', x, y + r * 0.06);
  g.textBaseline = 'alphabetic';
}

/** Texto con espaciado entre letras, centrado en x. */
function espaciado(g: CanvasRenderingContext2D, txt: string, x: number, y: number, sp: number): void {
  const anchos = [...txt].map((ch) => g.measureText(ch).width);
  const total = anchos.reduce((a, b) => a + b, 0) + sp * (txt.length - 1);
  let cx = x - total / 2;
  g.textAlign = 'left';
  [...txt].forEach((ch, i) => {
    g.fillText(ch, cx, y);
    cx += anchos[i] + sp;
  });
  g.textAlign = 'center';
}

function aImagen(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const i = new Image();
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = URL.createObjectURL(blob);
  });
}
