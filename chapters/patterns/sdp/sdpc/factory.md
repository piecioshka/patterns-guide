# Software Design Patterns / Creational / Factory (Method, Function)

> PL: Fabryka

<img src="images/icons/factory.svg" class="pattern-logo">

## Preview 🎉

- <a href="./demo/factory-method/">demo/factory-method</a>

## Description

**Fabryka** to wzorzec kreacyjny, który oddziela _tworzenie_ obiektu od jego
_użycia_. Zamiast wołać `new ConcreteClass()` w wielu miejscach, klient prosi
o obiekt jedną metodę fabryczną i dostaje gotowy egzemplarz — nie wiedząc,
która konkretnie klasa stoi za daną „etykietą".

Dzięki temu logika decydująca „co i jak utworzyć" mieszka w jednym miejscu.
Gdy pojawia się nowy typ produktu, zmieniasz wyłącznie fabrykę — kod kliencki
zostaje nietknięty.

- Use Cases (kiedy stosować)
  - Tworzenie obiektów zależy od konfiguracji / danych wejściowych
    (np. typ przekazany jako string, format pliku, środowisko).
  - Chcesz scentralizować i walidować proces powstawania obiektów.
  - Chcesz móc dodawać nowe typy bez modyfikacji kodu klienta
    ([Open-Closed Principle](chapters/patterns/solid/open-closed-principle.md)).
- Pros
  - Centralne miejsce tworzenia → łatwiejsze utrzymanie i walidacja.
  - Klient zależy od _interfejsu_, a nie od konkretnych klas (luźne sprzężenie).
  - Wspiera [Open-Closed Principle](chapters/patterns/solid/open-closed-principle.md).
- Cons
  - Dodatkowa warstwa abstrakcji = więcej kodu przy prostych przypadkach.
  - Nadużywana bywa „fabryką do wszystkiego", która łamie
    [Single Responsibility Principle](chapters/patterns/solid/single-responsibility-principle.md).

## Diagram

```mermaid
classDiagram
    class Client
    class ComputerFactory {
        -computerTypes: string[]
        +addComputerType(type)
        +createComputer(type) Computer
    }
    class Computer {
        +type: string
    }
    Client --> ComputerFactory : prosi o produkt
    ComputerFactory ..> Computer : tworzy (new)
```

Klient zna tylko fabrykę i jej metodę `createComputer(type)`. To fabryka
decyduje, jaki obiekt powstanie — i czy w ogóle powstanie.

## Example

### Problem — `new` rozsiane po kodzie

Bez fabryki każdy klient sam decyduje, co i jak stworzyć. Walidacja typu
i wiedza o konstruktorze duplikują się w wielu miejscach.

```js
// klient #1
const c1 = new Computer({ type: "notebook" }); // a co z nieznanym typem?

// klient #2 (inny plik) — ta sama walidacja powtórzona ręcznie
const allowed = ["notebook", "pc"];
const c2 = allowed.includes("macbook") ? new Computer({ type: "macbook" }) : null;
```

### Solution — jedna metoda fabryczna

```js
class ComputerFactory {
  constructor() {
    this._computerTypes = [];
  }

  addComputerType(type) {
    this._computerTypes.push(type);
  }

  createComputer(type) {
    // walidacja w jednym miejscu
    if (!this._computerTypes.includes(type)) {
      return null;
    }
    return new Computer({ type });
  }
}

class Computer {
  constructor(options) {
    this.type = options.type;
  }
}

// --- użycie ---
const cf = new ComputerFactory();
cf.addComputerType("notebook");
cf.addComputerType("pc");

cf.createComputer("notebook"); // Computer { type: "notebook" }
cf.createComputer("macbook"); // null — nieznany typ obsłużony centralnie
```

> 💡 W JavaScript fabryką bywa też zwykła **funkcja**, która zwraca obiekt —
> nie potrzebujesz klas, aby skorzystać z tego wzorca.

## Resources

- 🚀 <https://refactoring.guru/design-patterns/factory-method>
- <https://www.dofactory.com/javascript/factory-method-design-pattern>
- <https://medium.com/front-end-weekly/understand-the-factory-design-pattern-in-plain-javascript-20b348c832bd>
- <https://www.tutorialspoint.com/design_pattern/factory_pattern.htm>
