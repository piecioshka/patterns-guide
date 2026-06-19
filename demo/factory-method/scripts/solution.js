// Pattern: Factory Method

console.log('%cFile: solution.js', 'color: green');

{

    // Creator: definiuje metodę fabryczną i logikę biznesową na produkcie.
    class Logistics {
        // metoda fabryczna — podklasa MUSI ją nadpisać
        createTransport() {
            throw new Error('createTransport() must be implemented by a subclass');
        }

        // logika biznesowa nie wie, jaki konkretny produkt dostaje
        planDelivery() {
            const transport = this.createTransport();
            return transport.deliver();
        }
    }

    // Konkretni twórcy decydują o klasie produktu.
    class RoadLogistics extends Logistics {
        createTransport() {
            return new Truck();
        }
    }

    class SeaLogistics extends Logistics {
        createTransport() {
            return new Ship();
        }
    }

    // Produkty ze wspólnym interfejsem.
    class Truck {
        deliver() {
            return 'deliver by road in a box';
        }
    }

    class Ship {
        deliver() {
            return 'deliver by sea in a container';
        }
    }

    // -----------------------------------------------------------------------------

    console.log(new RoadLogistics().planDelivery()); // deliver by road in a box
    console.log(new SeaLogistics().planDelivery()); // deliver by sea in a container

    // Nowy transport = nowa podklasa, ZERO zmian w Logistics.planDelivery().
    class AirLogistics extends Logistics {
        createTransport() {
            return { deliver: () => 'deliver by air' };
        }
    }

    console.log(new AirLogistics().planDelivery()); // deliver by air

}
