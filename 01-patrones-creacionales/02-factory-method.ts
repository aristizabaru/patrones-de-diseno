import { COLORS } from "../helpers/colors.ts";
/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 *
 */

interface Hamburger {
  prepare(): void;
}

class ChickenHamburger implements Hamburger {
  public prepare(): void {
    console.log("Preparando una Hamburguesa de %cpollo\n", COLORS.yellow);
  }
}

class BeefHamburger implements Hamburger {
  public prepare(): void {
    console.log("Preparando una Hamburguesa de %cres\n", COLORS.brown);
  }
}

class FishHamburger implements Hamburger {
  public prepare(): void {
    console.log("Preparando una Hamburguesa de %cpescado\n", COLORS.blue);
  }
}

abstract class Restaurant {
  protected abstract createHamburger(): Hamburger;

  orderHamburger(): void {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

class FishRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new FishHamburger();
  }
}

const main = () => {
  let restaurant: Restaurant | null;
  let exit = false;

  console.log("Para salir del programa presiona %cexit", COLORS.red);

  while (!exit) {
    restaurant = null;
    const burgerType = prompt(
      "¿Qué tipo de hamburguesa quieres? ( chicken/beef/fish )",
    );

    switch (burgerType) {
      case "chicken":
        restaurant = new ChickenRestaurant();
        break;
      case "beef":
        restaurant = new BeefRestaurant();
        break;
      case "fish":
        restaurant = new FishRestaurant();
        break;
      case "exit":
        exit = true;
        break;

      default:
        console.log(
          "Opción no válida, debe ser una entre ( chicken/beef/fish )\n",
        );
    }
    if (exit || !restaurant) continue;

    restaurant.orderHamburger();
  }
};

main();
