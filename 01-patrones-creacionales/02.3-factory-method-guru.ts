/**
 * https://refactoring.guru/es/design-patterns/factory-method
 * EJEMPLO ADAPTADO DE PSEUDOCÓDIGO DE LA LA PÁGINA
 */

/**
 * Factory Method es un patrón de diseño creacional que proporciona
 * una interfaz para crear objetos en una superclase, mientras
 * permite a las subclases alterar el tipo de objetos que se crearán.
 */

// La clase creadora (factory) declara el método fábrica que debe devolver
// un objeto de una clase de producto. Normalmente, las
// subclases de la creadora proporcionan la implementación de
// este método.

abstract class Dialog {
  // La creadora también puede proporcionar cierta
  // implementación por defecto del método fábrica.
  protected abstract createButton(): Button;

  // Observa que, a pesar de su nombre, la principal
  // responsabilidad de la creadora no es crear productos.
  // Normalmente contiene cierta lógica de negocio que depende
  // de los objetos de producto devueltos por el método
  // fábrica. Las subclases pueden cambiar indirectamente esa
  // lógica de negocio sobrescribiendo el método fábrica y
  // devolviendo desde él un tipo diferente de producto.

  public render() {
    // Invoca el método fábrica para crear un objeto de
    // producto.
    const okButton: Button = this.createButton();
    // Ahora utiliza el producto.
    okButton.onClick();
    okButton.render();
  }
}

// Los creadores concretos sobrescriben el método fábrica para
// cambiar el tipo de producto resultante.
class WindowsDialog extends Dialog {
  override createButton(): Button {
    return new WindowsButton();
  }
}

class WebDialog extends Dialog {
  override createButton(): Button {
    return new HTMLButton();
  }
}

// La interfaz de producto declara las operaciones que todos los
// productos concretos deben implementar.
interface Button {
  render(): void;
  onClick(): void;
}

// Los productos concretos proporcionan varias implementaciones
// de la interfaz de producto.

class WindowsButton implements Button {
  public render(): void {
    console.log("Render botón de windows");
  }

  public onClick(): void {
    console.log("Evento clic de OS nativo");
  }
}

class HTMLButton implements Button {
  public render(): void {
    console.log("Render botón HTML del navegador");
  }

  public onClick(): void {
    console.log("Evento clic de navegador web");
  }
}

class Application {
  private dialog?: Dialog;
  private appType?: "Windows" | "Web";

  // La aplicación elige un tipo de creador dependiendo de la
  // configuración actual o los ajustes del entorno.
  private initialize() {
    if (!this.appType) return;

    if (this.appType == "Windows") {
      this.dialog = new WindowsDialog();
    } else if (this.appType == "Web") {
      this.dialog = new WebDialog();
    } else throw new Error("Error! Unknown operating system.");
  }
  // El código cliente funciona con una instancia de un
  // creador concreto, aunque a través de su interfaz base.
  // Siempre y cuando el cliente siga funcionando con el
  // creador a través de la interfaz base, puedes pasarle
  // cualquier subclase del creador.
  public main(appType: "Windows" | "Web"): void {
    this.appType = appType;
    this.initialize();

    if (!this.dialog) return;
    this.dialog.render();
  }
}

new Application().main("Windows");
