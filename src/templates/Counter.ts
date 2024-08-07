import { html } from "../utilities/html.ts";

const NUMBER_OF_DIGITS = 10;
const WIDTH = 16;
const HEIGHT = 24;
const OFFSET = 6;
const GAP = 2;

const SVG_WIDTH = NUMBER_OF_DIGITS * (WIDTH + GAP) + OFFSET * 2 - 1;
const SVG_HEIGHT = HEIGHT + OFFSET;

const RECTS = Array.from({ length: NUMBER_OF_DIGITS })
  .map((_, index) => {
    return html`<rect
      x="${String(index * (WIDTH + GAP) + OFFSET)}"
      y="0"
      width="${String(WIDTH)}"
      height="${String(HEIGHT)}"
      fill="black"
      filter="drop-shadow(0 2px 2px rgba(0, 0, 0, 0.35)"
    />`;
  })
  .join("");

const renderDigits = (digits: string[]) => {
  return digits
    .map((singleDigit, index) => {
      return html`<text
        x="${String(index * (WIDTH + GAP) + WIDTH / 2 + OFFSET)}"
        y="${String(HEIGHT / 2)}"
        font-size="16px"
        fill="white"
        font-family="monospace"
        dominant-baseline="central"
        text-anchor="middle"
      >
        ${singleDigit}
      </text>`;
    })
    .join("");
};

export const Counter = (count: number) => {
  const countDigits = String(count).padStart(NUMBER_OF_DIGITS, "0").split("");

  return html`<svg
    width="${String(SVG_WIDTH)}"
    height="${String(SVG_HEIGHT)}"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Hit counter"
  >
    ${RECTS}${renderDigits(countDigits)}
  </svg>`;
};
