// https://refactoring.guru/es/design-patterns/builder

// El uso del patrón Builder sólo tiene sentido cuando tus
// productos son bastante complejos y requieren una
// configuración extensiva. Los dos siguientes productos están
// relacionados, aunque no tienen una interfaz común.
class House {
  public pools: number = 0;
  public gardens: number = 0;
  public bedrooms: number = 1;
  public doors: number = 1;
  public toilets: number = 1;

  displayConfiguration(): void {
    console.log(`
    POOLS - ${this.pools}  
    GARDENS - ${this.gardens}  
    BEDROOMS - ${this.bedrooms}  
    DOORS - ${this.doors}  
    TOILETS - ${this.toilets}
    --------------
  `);
  }
}

// La interfaz constructora especifica métodos para crear las
// distintas partes de los objetos del producto.
interface Builder {
  reset(): Builder;
  buildPools(value: number): Builder;
  buildGardens(value: number): Builder;
  buildBedrooms(value: number): Builder;
  buildDoors(value: number): Builder;
  buildToilets(value: number): Builder;
}

interface Director {
  makeSmallHouse(builder: Builder): Builder;
  makeBigHouse(builder: Builder): Builder;
}

// Las clases constructoras concretas siguen la interfaz
// constructora y proporcionan implementaciones específicas de
// los pasos de construcción. El programa puede tener multitud
// de variaciones de objetos constructores, cada una de ellas
// implementada de forma diferente.
class HouseBuilder implements Builder {
  private house: House;

  // Una nueva instancia de la clase constructora debe
  // contener un objeto de producto en blanco que utiliza en
  // el montaje posterior.
  constructor() {
    this.house = new House();
  }

  // El método reset despeja el objeto en construcción.
  reset(): HouseBuilder {
    this.house = new House();
    return this;
  }

  // Los pasos de producción funcionan con la misma
  // instancia de producto.
  buildPools(value: number): HouseBuilder {
    this.house.pools = value;
    return this;
  }

  buildGardens(value: number): HouseBuilder {
    this.house.gardens = value;
    return this;
  }

  buildBedrooms(value: number): HouseBuilder {
    this.house.bedrooms = value;
    return this;
  }

  buildDoors(value: number): HouseBuilder {
    this.house.doors = value;
    return this;
  }

  buildToilets(value: number): HouseBuilder {
    this.house.toilets = value;
    return this;
  }

  // Los constructores concretos deben proporcionar sus
  // propios métodos para obtener resultados. Esto se debe a
  // que varios tipos de objetos constructores pueden crear
  // productos completamente diferentes de los cuales no todos
  // siguen la misma interfaz. Por lo tanto, dichos métodos no
  // pueden declararse en la interfaz constructora (al menos
  // no en un lenguaje de programación de tipado estático).
  //
  // Normalmente, tras devolver el resultado final al cliente,
  // una instancia constructora debe estar lista para empezar
  // a generar otro producto. Ese es el motivo por el que es
  // práctica común invocar el método reset al final del
  // cuerpo del método `getProduct`. Sin embargo, este
  // comportamiento no es obligatorio y puedes hacer que tu
  // objeto constructor espere una llamada reset explícita del
  // código cliente antes de desechar el resultado anterior.
  getHouse(): House {
    const house = this.house;
    this.reset();

    return house;
  }
}

// El director sólo es responsable de ejecutar los pasos de
// construcción en una secuencia particular. Resulta útil cuando
// se crean productos de acuerdo con un orden o configuración
// específicos. En sentido estricto, la clase directora es
// opcional, ya que el cliente puede controlar directamente los
// objetos constructores.
class HouseDirector implements Director {
  // El director funciona con cualquier instancia de
  // constructor que le pase el código cliente. De esta forma,
  // el código cliente puede alterar el tipo final del
  // producto recién montado. El director puede construir
  // multitud de variaciones de producto utilizando los mismos
  // pasos de construcción.
  makeSmallHouse(builder: Builder): Builder {
    return builder.reset().buildBedrooms(2).buildDoors(1);
  }

  makeBigHouse(builder: Builder): Builder {
    return builder
      .reset()
      .buildBedrooms(5)
      .buildDoors(2)
      .buildGardens(1)
      .buildPools(1)
      .buildToilets(4);
  }
}

function main() {
  const director = new HouseDirector();
  const houseBuilder = new HouseBuilder();

  director.makeBigHouse(houseBuilder);
  // El producto final a menudo se extrae de un objeto
  // constructor, ya que el director no conoce y no
  // depende de constructores y productos concretos.
  const bigHouse = houseBuilder.getHouse();
  console.log("BIG HOUSE");
  bigHouse.displayConfiguration();

  director.makeSmallHouse(houseBuilder);
  const smallHouse = houseBuilder.getHouse();
  console.log("SMALL HOUSE");
  smallHouse.displayConfiguration();

  // NOTA IMPORTANTE:
  // Si el código cliente necesita ensamblar un modelo de casa con ajustes especiales,
  // puede trabajar directamente con el objeto constructor. Por otro lado, el cliente puede
  // delegar el ensamblaje a la clase directora, que sabe cómo utilizar un objeto
  // constructor para construir varios de los tipos más populares de casas.
  const customHouse = new HouseBuilder()
    .buildGardens(3)
    .buildBedrooms(8)
    .buildPools(2)
    .buildToilets(10)
    .getHouse();
  console.log("CUSTOM HOUSE");
  customHouse.displayConfiguration();
}

main();
