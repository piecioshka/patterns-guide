// Pattern: Builder

console.log('%cFile: solution.js', 'color: green');

{
    class PersonBuilder {
        constructor(name, surname) {
            this.name = name;
            this.surname = surname;
        }
        setAge(age) {
            this.age = age;
            return this;
        }
        setWeight(weight) {
            this.weight = weight;
            return this;
        }
        build() {
            return new Person(
                this.name,
                this.surname,
                this.age,
                this.weight
            );
        }
    }

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

    // const p = new Person('John', 'Doe', 58, 69);
    // p.displayAge() // ??? 58 or 69

    new PersonBuilder('John', 'Doe')
        .setAge(58)
        .setWeight(69)
        .build()
        // Next method is from Person Class
        .displayAge() // 58!
}
