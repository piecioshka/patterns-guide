(function (root) {
    'use strict';

    root.app = root.app || {};

    class AppController {
        constructor() {
            this.model = null;
            this.ui = new root.app.AppComponent();
        }

        setModel(model) {
            this.model = model;
        }

        start() {
            this.ui.render(
                this.model,
                document.querySelector('#app')
            );
        }
    }

    root.app.AppController = AppController;
}(this));
