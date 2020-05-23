// Pattern: Adapter

console.log('%cFile: solution.js', 'color: green');

{
    class Person {
        constructor(name_surname) {
            this.name_surname = name_surname;
        }
        getName() {
            return this.name_surname;
        }
    }

    class PersonAdapter extends Person {
        constructor(name, surname) {
            super(`${name} ${surname}`);
        }
    }

    const pa = new PersonAdapter('Piotr', 'Kowalski');
    const name = pa.getName(); // 'Piotr Kowalski'

    console.log({ name });
}
