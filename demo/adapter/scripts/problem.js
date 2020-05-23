// Pattern: Adapter

console.log('%cFile: problem.js', 'color: red');

{
    class Person {
        constructor(name_surname) {
            this.name_surname = name_surname;
        }
        getName() {
            return this.name_surname;
        }
    }

    const p = new Person('Piotr Kowalski');
    const name = p.getName();
    console.log({ name });

    // How to pass name and surname independently?
}
