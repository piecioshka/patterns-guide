// Pattern: Simple Factory

console.log('%cFile: problem.js', 'color: red');

{
    class Computer {
        constructor(options) {
            this.type = options.type;
        }
    }

    // Bez fabryki: każdy klient sam tworzy obiekt i sam waliduje typ.
    // Walidacja oraz wiedza o konstruktorze duplikują się w wielu miejscach.

    const allowedTypes = ['notebook', 'pc'];

    // klient #1
    const c1 = allowedTypes.includes('notebook')
        ? new Computer({ type: 'notebook' })
        : null;
    console.log(c1); // Computer { type: "notebook" }

    // klient #2 (inny plik) — ta sama walidacja powtórzona ręcznie
    const c2 = allowedTypes.includes('macbook')
        ? new Computer({ type: 'macbook' })
        : null;
    console.log(c2); // null
}

// Problems
// 1. Rozsiane `new` + powtórzona walidacja typu w wielu miejscach
// 2. Dodanie nowego typu wymaga zmian w każdym kliencie
