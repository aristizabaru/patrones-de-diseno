/**
 * https://refactoring.guru/es/design-patterns/abstract-factory
 * EJEMPLO ADAPTADO DE PSEUDOCÓDIGO DE LA LA PÁGINA
 */

import { COLORS } from "../helpers/colors.ts";

/**
 * Abstract Factory es un patrón de diseño creacional que nos permite
 * producir familias de objetos relacionados sin especificar sus
 * clases concretas.
 */

// La interfaz fábrica abstracta declara un grupo de métodos que
// devuelven distintos productos abstractos. Estos productos se
// denominan familia y están relacionados por un tema o concepto
// de alto nivel. Normalmente, los productos de una familia
// pueden colaborar entre sí. Una familia de productos puede
// tener muchas variantes, pero los productos de una variante
// son incompatibles con los productos de otra.
interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

// Las fábricas concretas producen una familia de productos que
// pertenecen a una única variante. La fábrica garantiza que los
// productos resultantes sean compatibles. Las firmas de los
// métodos de las fábricas concretas devuelven un producto
// abstracto mientras que dentro del método se instancia un
// producto concreto.
class WinFactory implements GUIFactory {
  public createButton(): Button {
    return new WinButton();
  }

  public createCheckbox(): Checkbox {
    return new WinCheckbox();
  }
}

// Cada fábrica concreta tiene una variante de producto
// correspondiente.
class MacFactory implements GUIFactory {
  public createButton(): Button {
    return new MacButton();
  }

  public createCheckbox(): Checkbox {
    return new MacCheckbox();
  }
}

// Cada producto individual de una familia de productos debe
// tener una interfaz base. Todas las variantes del producto
// deben implementar esta interfaz.
interface Button {
  paint(): void;
}

// Los productos concretos son creados por las fábricas
// concretas correspondientes.
class WinButton implements Button {
  public paint(): void {
    console.log("Rendering Windows Button");
  }
}

class MacButton implements Button {
  public paint(): void {
    console.log("Rendering Mac Button");
  }
}

// Aquí está la interfaz base de otro producto. Todos los
// productos pueden interactuar entre sí, pero sólo entre
// productos de la misma variante concreta es posible una
// interacción adecuada.
interface Checkbox {
  paint(): void;
}

class WinCheckbox implements Checkbox {
  public paint(): void {
    console.log("Rendering Windows Checkbox");
  }
}

class MacCheckbox implements Checkbox {
  public paint(): void {
    console.log("Rendering Mac Checkbox");
  }
}

// El código cliente funciona con fábricas y productos
// únicamente a través de tipos abstractos: GUIFactory, Button y
// Checkbox. Esto te permite pasar cualquier subclase fábrica o
// producto al código cliente sin descomponerlo.
class Application {
  private factory: GUIFactory;
  private button?: Button;

  constructor(factory: GUIFactory) {
    this.factory = factory;
  }

  public createUI() {
    this.button = this.factory.createButton();
  }

  public paint() {
    if (!this.button) return;

    this.button.paint();
  }
}

// La aplicación elige el tipo de fábrica dependiendo de la
// configuración actual o de los ajustes del entorno y la crea
// durante el tiempo de ejecución (normalmente en la etapa de
// inicialización).
function main(configOS: "Windows" | "Mac") {
  let factory;

  if (configOS == "Windows") {
    factory = new WinFactory();
  } else if (configOS == "Mac") {
    factory = new MacFactory();
  } else throw new Error("Error! Unknown operating system.");

  const app = new Application(factory);
  app.createUI();
  app.paint();
}

console.log("\n%cLoading windows config...", COLORS.blue);
main("Windows");
console.log("\n%cLoading mac config...", COLORS.blue);
main("Mac");
