(function (root) {
    'use strict';

    let PersonModel = root.app.PersonModel;
    let Controller = root.app.Controller;

    function setup() {
        let controller = new Controller();
        controller.setModel(new PersonModel());
        controller.start();
    }

    window.addEventListener('DOMContentLoaded', setup);
}(this));
