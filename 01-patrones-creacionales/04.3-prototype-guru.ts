/**
 * https://refactoring.guru/es/design-patterns/prototype
 * EJEMPLO ADAPTADO DE PSEUDOCÓDIGO DE LA LA PÁGINA
 */

/**
 * Prototype es un patrón de diseño creacional que nos permite
 * copiar objetos existentes sin que el código dependa de sus clases.
 */

// Prototipo base.
abstract class Shape {
  public x: number;
  public y: number;
  public color: string;

  // En otros lenguajes de programación se podría tener dos prototipos
  // si aceptara sobrecarga de métodos, en este caso no se tiene
  // un constructor normal y uno para el prototipo sino un constructor
  // que diferencia si recibe un objecto a clonar o no.

  // El constructor prototipo: Un nuevo objeto se inicializa
  // con valores del objeto existente.
  constructor(source?: Shape) {
    if (source) {
      this.x = source.x;
      this.y = source.y;
      this.color = source.color;
    } else {
      // ...
      this.x = 0;
      this.y = 0;
      this.color = "";
    }
  }

  // La operación clonar devuelve una de las subclases de
  // Shape (Forma).
  public abstract clone(): Shape;
}

// Prototipo concreto. El método de clonación crea un nuevo
// objeto y lo pasa al constructor. Hasta que el constructor
// termina, tiene una referencia a un nuevo clon. De este modo
// nadie tiene acceso a un clon a medio terminar. Esto garantiza
// la consistencia del resultado de la clonación.
class Circle extends Shape {
  public radius: number;

  constructor(source?: Circle) {
    super(source);

    if (source) {
      this.radius = source.radius;
    } else {
      this.radius = 0;
    }
  }

  public override clone(): Circle {
    return new Circle(this);
  }
}

class Rectangle extends Shape {
  public width: number;
  public height: number;

  constructor(source?: Rectangle) {
    super(source);

    if (source) {
      this.width = source.width;
      this.height = source.height;
    } else {
      this.width = 0;
      this.height = 0;
    }
  }

  public override clone(): Rectangle {
    return new Rectangle(this);
  }
}

// En alguna parte del código cliente.
class Application {
  private shapes: Shape[] = [];

  constructor() {
    const circle = new Circle();
    circle.x = 10;
    circle.y = 10;
    circle.radius = 20;
    this.shapes.push(circle);

    const anotherCircle = circle.clone();
    this.shapes.push(anotherCircle);
    // La variable `anotherCircle` (otroCírculo) contiene
    // una copia exacta del objeto `circle`.

    const rectangle = new Rectangle();
    rectangle.width = 10;
    rectangle.height = 20;
    this.shapes.push(rectangle);
  }

  public businessLogic(): Shape[] {
    // Prototype es genial porque te permite producir una
    // copia de un objeto sin conocer nada de su tipo.
    const shapesCopy: Shape[] = [];

    // Por ejemplo, no conocemos los elementos exactos de la
    // matriz de formas. Lo único que sabemos es que son
    // todas formas. Pero, gracias al polimorfismo, cuando
    // invocamos el método `clonar` en una forma, el
    // programa comprueba su clase real y ejecuta el método
    // de clonación adecuado definido en dicha clase. Por
    // eso obtenemos los clones adecuados en lugar de un
    // grupo de simples objetos Shape.
    for (const s of this.shapes) {
      shapesCopy.push(s.clone());
    }

    // La matriz `shapesCopy` contiene copias exactas del
    // hijo de la matriz `shape`.
    return shapesCopy;
  }
}

const app = new Application();

const clonedShapes = app.businessLogic();

console.log("Formas clonadas:");
console.log(clonedShapes);
