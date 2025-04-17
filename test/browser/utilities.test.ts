import { describe, expect, it } from "vitest";
import { add } from "../../src/utilities";

describe("Add function in browser environment", () => {
  // Verificamos que estamos en un entorno tipo navegador (jsdom)
  it("should run in a browser-like environment", () => {
    expect(typeof globalThis.window).toBe("object");
    expect(typeof document).toBe("object");
  });

  // Probamos la función add básica
  it("should correctly add two numbers", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  // Podríamos también probar la interacción con elementos del DOM si fuera necesario
  it("should be able to use DOM methods", () => {
    // Crear un elemento div para demostrar interacción con DOM
    const div = document.createElement("div");
    div.textContent = `Result: ${String(add(10, 20))}`;

    // Verificar que el contenido del div es el esperado
    expect(div.textContent).toBe("Result: 30");
  });
});
