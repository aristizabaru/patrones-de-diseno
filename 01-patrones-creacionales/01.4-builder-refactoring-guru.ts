/**
 * https://refactoring.guru/es/design-patterns/builder
 */
type Default = "Regular";
type Engine = "v8" | "v4" | "v2" | Default;
type Seat = "Bucket Seats" | "Bench Seats" | Default;
type TripComputer = "8 RAM" | "16 RAM" | Default;
type GPS = "Light" | "Ultra" | Default;

type DefaultManual = "Regular - Manual";
type EngineManual =
  | "v8 - Manual"
  | "v4 - Manual"
  | "v2 - Manual"
  | DefaultManual;
type SeatManual =
  | "Bucket Seats - Manual"
  | "Bench Seats - Manual"
  | DefaultManual;
type TripComputerManual = "8 RAM - Manual" | "16 RAM - Manual" | DefaultManual;
type GPSManual = "Light - Manual" | "Ultra - Manual" | DefaultManual;

interface Builder {
  reset(): Builder;
  setSeats(value: Seat): Builder;
  setEngine(value: Engine): Builder;
  setTripComputer(value: TripComputer): Builder;
  setGPS(value: GPS): Builder;
}

interface Director {
  constructSportsCar(builder: Builder): Builder;
  constructSUV(builder: Builder): Builder;
  constructEntryCar(builder: Builder): Builder;
}

class Car {
  public engine: Engine = "Regular";
  public seat: Seat = "Regular";
  public tripComputer: TripComputer = "Regular";
  public gps: GPS = "Regular";
  public manual?: Manual;

  displayConfiguration(): void {
    console.log(`
      ENGINE: ${this.engine}
      SEAT: ${this.seat}
      TRIP COMPUTER: ${this.tripComputer}
      GPS: ${this.gps}
      `);
    if (this.manual) {
      console.log("\nMANUAL");
      this.manual?.displayConfiguration();
    } else {
      console.log("\nMANUAL: Not found");
    }
  }
}

class Manual {
  public engine: EngineManual = "Regular - Manual";
  public seat: SeatManual = "Regular - Manual";
  public tripComputer: TripComputerManual = "Regular - Manual";
  public gps: GPSManual = "Regular - Manual";

  displayConfiguration(): void {
    console.log(`
      ENGINE: ${this.engine}
      SEAT: ${this.seat}
      TRIP COMPUTER: ${this.tripComputer}
      GPS: ${this.gps}
      `);
  }
}

class CarBuilder implements Builder {
  private car: Car = new Car();

  reset(): CarBuilder {
    this.car = new Car();
    return this;
  }
  setSeats(value: Seat): CarBuilder {
    this.car.seat = value;
    return this;
  }
  setEngine(value: Engine): CarBuilder {
    this.car.engine = value;
    return this;
  }
  setTripComputer(value: TripComputer): CarBuilder {
    this.car.tripComputer = value;
    return this;
  }
  setGPS(value: GPS): CarBuilder {
    this.car.gps = value;
    return this;
  }

  getProduct(): Car {
    const product = this.car;
    this.reset();
    return product;
  }
}

class ManualBuilder implements Builder {
  private carManual: Manual = new Manual();

  reset(): ManualBuilder {
    this.carManual = new Manual();
    return this;
  }
  setSeats(value: Seat): ManualBuilder {
    this.carManual.seat = `${value} - Manual`;
    return this;
  }
  setEngine(value: Engine): ManualBuilder {
    this.carManual.engine = `${value} - Manual`;
    return this;
  }
  setTripComputer(value: TripComputer): ManualBuilder {
    this.carManual.tripComputer = `${value} - Manual`;
    return this;
  }
  setGPS(value: GPS): ManualBuilder {
    this.carManual.gps = `${value} - Manual`;
    return this;
  }

  getProduct(): Manual {
    const product = this.carManual;
    this.reset();
    return product;
  }
}

class CarDirector implements Director {
  constructSportsCar(builder: Builder): Builder {
    return builder
      .reset()
      .setEngine("v8")
      .setGPS("Ultra")
      .setSeats("Bucket Seats")
      .setTripComputer("16 RAM");
  }
  constructSUV(builder: Builder): Builder {
    return builder
      .reset()
      .setEngine("v4")
      .setGPS("Regular")
      .setSeats("Bench Seats")
      .setTripComputer("8 RAM");
  }
  constructEntryCar(builder: Builder): Builder {
    return builder
      .setEngine("v2")
      .setGPS("Light")
      .setSeats("Bench Seats")
      .setTripComputer("8 RAM");
  }
}

function main() {
  const director = new CarDirector();
  const carBuilder = new CarBuilder();
  const manualBuilder = new ManualBuilder();

  director.constructSportsCar(carBuilder);
  director.constructSportsCar(manualBuilder);
  const sportCar = carBuilder.getProduct();
  const sportCarManual = manualBuilder.getProduct();
  sportCar.manual = sportCarManual;

  director.constructSUV(carBuilder);
  director.constructSUV(manualBuilder);
  const suvCar = carBuilder.getProduct();
  const suvCarManual = manualBuilder.getProduct();
  suvCar.manual = suvCarManual;

  director.constructEntryCar(carBuilder);
  director.constructEntryCar(manualBuilder);
  const entryCar = carBuilder.getProduct();
  const entryCarManual = manualBuilder.getProduct();
  entryCar.manual = entryCarManual;

  console.log("\n--------------\nSPORT CAR CONFIG");
  sportCar.displayConfiguration();
  console.log("\n--------------\nSUV CAR CONFIG");
  suvCar.displayConfiguration();
  console.log("\n--------------\nENTRY CAR CONFIG");
  entryCar.displayConfiguration();
}

main();
