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

    class PersonAdapter {
        constructor(name, surname) {
            this.person = new Person(
                `${name} ${surname}`
            )
        }
        getName() {
            return this.person.getName();
        }
    }

    const pa = new PersonAdapter('Piotr', 'Kowalski');
    const name = pa.getName(); // 'Piotr Kowalski'

    console.log({ name });
}
