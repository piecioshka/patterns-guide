(function (root) {
    'use strict';

    const PersonModel = root.app.PersonModel;
    const AppController = root.app.AppController;

    function main() {
        const c = new AppController();
        c.setModel(new PersonModel());
        c.start();
    }

    window.addEventListener('DOMContentLoaded', main);
}(this));
