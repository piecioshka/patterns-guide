(function (root) {
    'use strict';

    root.app = root.app || {};

    let BoardComponent = root.app.BoardComponent;
    let InputComponent = root.app.InputComponent;

    class Controller {
        constructor() {
            console.debug('[+] new Controller');
            this.model = null;
        }

        setModel(model) {
            this.model = model;
        }

        start() {
            let input = new InputComponent(this.model);
            let board = new BoardComponent(this.model);
            input.onInput(board.refresh.bind(board));
        }
    }

    root.app.Controller = Controller;
}(this));
