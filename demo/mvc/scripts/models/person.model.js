(function (root) {
    'use strict';

    root.app = root.app || {};

    class PersonModel {
        constructor(name = '') {
            this.name = name;
        }

        setName(name) {
            this.name = name;
        }
    }

    root.app.PersonModel = PersonModel;
}(this));
