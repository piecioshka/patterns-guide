// Pattern: Builder

console.log('%cFile: problem.js', 'color: red');

{
    class Person {
        constructor(name, surname, age, weight) {
            this.name = name;
            this.surname = surname;
            this.age = age;
            this.weight = weight;
        }
        displayAge() {
            console.log(this.age);
        }
    }

    const p = new Person('John', 'Doe', 58, 69);
    p.displayAge() // ??? 58 or 69
}
