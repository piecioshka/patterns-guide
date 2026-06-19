// Pattern: Factory Method

console.log("%cFile: problem.js", "color: red");

{
  class Truck {
    deliver() {
      return "deliver by road in a box";
    }
  }

  class Ship {
    deliver() {
      return "deliver by sea in a container";
    }
  }

  // Logika biznesowa sama tworzy konkretne klasy produktów.
  class Logistics {
    planDelivery(type) {
      let transport;

      if (type === "road") {
        transport = new Truck();
      } else if (type === "sea") {
        transport = new Ship(); // nowy transport = edycja tej metody
      }

      return transport.deliver();
    }
  }

  const logistics = new Logistics();
  console.log(logistics.planDelivery("road")); // deliver by road in a box
  console.log(logistics.planDelivery("sea")); // deliver by sea in a container
}

// Problems
// 1. Wybór klasy produktu zaszyty w logice biznesowej (if/else)
// 2. Dodanie nowego transportu wymusza zmianę planDelivery()
//      - łamie "Open/Close Principle from SOLID"
