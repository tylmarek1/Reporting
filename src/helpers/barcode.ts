import { createCanvas } from "canvas";
import JsBarcode from "jsbarcode";

// Funkce pro generování čárového kódu
export function generateBarcode(text: string) {
  const canvas = createCanvas(50, 50);
  JsBarcode(canvas, text, { format: "CODE128", displayValue: true, width: 1, height: 30 });
  return canvas.toDataURL("image/png");
}

export default {
  generateBarcode,
};
