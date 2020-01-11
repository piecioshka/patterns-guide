(function (root) {
    'use strict';

    root.app = root.app || {};

    class PersonModel {
        constructor(name = '') {
            console.debug('[+] new PersonModel');
            this.name = name;
        }

        setName(name) {
            this.name = name;
        }
    }

    root.app.PersonModel = PersonModel;
}(this));
