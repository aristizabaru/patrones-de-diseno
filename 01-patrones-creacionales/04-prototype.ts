/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class PrototypeDocument {
  public title: string;
  private content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  public displayInfo(): void {
    console.log(`
      Title: ${this.title}
      Author: ${this.author}
      Content: ${this.content}
      `);
  }

  public clone(): PrototypeDocument {
    return new PrototypeDocument(this.title, this.content, this.author);
  }
}

function main() {
  const quote = new PrototypeDocument(
    "Cotización",
    "500 USD",
    "Andrés Aristizábal",
  );

  console.log({ quote });
  quote.displayInfo();

  const quote2 = quote.clone();
  console.log({ quote2 });
  quote2.displayInfo();
}

main();
