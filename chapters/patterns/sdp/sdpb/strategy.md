# Software Design Patterns / Behavioral / Strategy

> PL: Strategia

<img src="images/icons/jigsaw.svg" class="pattern-logo">

## Preview 🎉

- <a href="./demo/strategy/">demo/strategy</a>

## Description

**Strategia** to wzorzec behawioralny: definiujesz rodzinę wymiennych
algorytmów (strategii), zamykasz każdy z nich w osobnym obiekcie/funkcji
i pozwalasz wybierać je w czasie działania programu. Klient operuje na
wspólnym „interfejsie", a konkretną strategię podmienia jak część układanki.

Sednem wzorca jest **zastąpienie rozgałęzień `if/else` (lub `switch`)** mapą
algorytmów. Wybór ścieżki staje się danymi (kluczem w mapie), a nie kodem —
więc dodanie nowego wariantu nie wymaga dotykania logiki wyboru.

- Use Cases (kiedy stosować)
  - Masz wiele wariantów „jak coś zrobić" wybieranych po wartości
    (format pliku, metoda płatności, sposób sortowania, algorytm kompresji).
  - Rozrastający się `switch`/`if-else` chcesz rozbić na niezależne kawałki.
  - Chcesz testować każdy algorytm w izolacji.
- Pros
  - Eliminuje rozbudowane warunki — wybór to lookup w mapie.
  - Luźne sprzężenie: klient nie zna szczegółów algorytmów.
  - Spełnia [Open-Closed Principle](chapters/patterns/solid/open-closed-principle.md)
    — nową strategię dodajesz, nie modyfikując istniejących.
- Cons
  - Więcej drobnych plików/obiektów.
  - Przerost dla 2–3 prostych przypadków (prosty `if` bywa czytelniejszy).

## Diagram

```mermaid
flowchart LR
    Client([Client]) -->|format = 'mp4'| Context[Context / lookup]
    Context -->|map.get(format)| Registry[(Strategy Map)]
    Registry --> S1["handleMp4()"]
    Registry --> S2["handleMp3()"]
    Registry --> S3["handleJpg()"]
    S1 -.wybrana.-> Run[[wykonaj strategię]]
```

Zamiast `if format === 'mp4' … else if …`, kontekst pobiera funkcję z mapy
po kluczu i ją wywołuje. Dodanie `webp` to `map.set('webp', …)` — bez zmian
w kodzie wyboru.

## Example

### Problem — rosnący `if / else if`

```js
function handleMp4() { console.log("handle mp4 file"); }
function handleMp3() { console.log("handle mp3 file"); }
function handleJpg() { console.log("handle jpg file"); }

const format = "mp4";

if (format === "mp4") {
  handleMp4();
} else if (format === "mp3") {
  handleMp3();
} else if (format === "jpg") {
  handleJpg();
} else {
  console.error("Unsupported format"); // każdy nowy format = nowy else-if
}
```

Każdy nowy format wymusza edycję tej drabinki `if` — to łamie
[Open-Closed Principle](chapters/patterns/solid/open-closed-principle.md).

### Solution — mapa strategii

```js
const strategies = new Map();

// każda strategia rejestruje się niezależnie (np. w osobnym pliku)
strategies.set("mp4", () => console.log("handle mp4 file"));
strategies.set("mp3", () => console.log("handle mp3 file"));
strategies.set("jpg", () => console.log("handle jpg file"));

// kontekst: wybór = lookup, nie rozgałęzienie
function handleFile(format) {
  const strategy = strategies.get(format);
  if (!strategy) {
    throw new Error(`Unsupported format: ${format}`);
  }
  return strategy();
}

handleFile("mp4"); // wypisze w konsoli: "handle mp4 file" (zwraca undefined)

// nowy format? jedna linijka, zero zmian w handleFile:
strategies.set("webp", () => console.log("handle webp file"));
```

## Resources

- 🚀 <https://refactoring.guru/design-patterns/strategy>
- PL: <http://www.algorytm.org/wzorce-projektowe/strategia-strategy.html>
- <https://www.dofactory.com/javascript/strategy-design-pattern>
- PL: <http://adamczuk.net.pl/2012/02/10/wzorzec-projektowy-strategia/>
- PL: <https://nafrontendzie.pl/wzorzec-strategia-w-javascript>
- PL: <https://lukasz-socha.pl/php/wzorce-projektowe-cz-2-strategy/> (PHP)
