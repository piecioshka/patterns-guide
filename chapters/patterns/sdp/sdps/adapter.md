# Software Design Patterns / Structural / Adapter (Wrapper)

> PL: Przejściówka

<img src="images/icons/wire.svg" class="pattern-logo">

## Demo 🎉

* <a href="./demo/adapter/">demo/adapter</a>

## Description

* Similar to [Facade Pattern](chapters/patterns/sdp/sdps/facade.md),
    but **Adapter** requires two interfaces which will are integrated
* Could be implemented as paradigm:
    + **functional**, in every language
    + **inheritance**, in languages that support multiple inheritance ex. C++
* Use Cases (when to use this pattern)
    + Wrap vendor to own interface
    + Use legacy code, but you don't what to touch them
* Pros
    + [Single Responsibility Principle](chapters/patterns/solid/single-responsibility-principle.md)
    + [Open-Closed Principle](chapters/patterns/solid/open-closed-principle.md)
    + Allows objects with incompatible interfaces to collaborate
    + Adapter wraps one of the objects to hide the complexity of conversion happening behind the scenes
    + Put the missing functionality (of Legacy Code) into an adapter class
* Cons
    + Decrease performance, too many adapters?

## Resources

* 🚀 <https://refactoring.guru/design-patterns/adapter>
* <https://www.dofactory.com/javascript/adapter-design-pattern>
* <https://en.wikipedia.org/wiki/Adapter_pattern>
* <http://addyosmani.com/resources/essentialjsdesignpatterns/book/#wrapperpatternjquery>
* PL: <https://frontstack.pl/adapter-design-pattern/>
* PL: <https://lukasz-socha.pl/php/wzorce-projektowe-cz-8-adapter/> (PHP)
