# Software Design Patterns / Creational / Factory Method

> PL: Metoda wytwórcza

<img src="images/icons/factory.svg" class="pattern-logo">

## Demo 🎉

* <a href="./demo/factory-method/">demo/factory-method</a>

## Description

* Separates product construction code from the code that actually uses the product
* Subjects:
    + creator, ex. Transport
    + product, ex. Ship, Truck
* Use Cases (when to use this pattern)
    + Create data in unit tests
    + When create library, and would like to extends internal implementation
* Pros
    + The same method implemented in multi classes could be override, so from
        outside there is no changes occur
* Cons
    + Complicated code

## Resources

* 🚀 <https://refactoring.guru/design-patterns/factory-method>
* <https://www.dofactory.com/javascript/factory-method-design-pattern>
* <https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e>
* <http://addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript>
* PL: <http://www.algorytm.org/wzorce-projektowe/metoda-wytworcza-factory-method.html>
* PL: <https://lukasz-socha.pl/php/wzorce-projektowe-cz-7-factory-method/> (PHP)
