(function (root) {
    'use strict';

    root.app = root.app || {};

    let AbstractComponent = root.app.AbstractComponent;

    class BoardComponent extends AbstractComponent {
        constructor(model) {
            console.debug('[+] new BoardComponent');
            super();
            this.model = model;
            this.$element = null;
            this._$target = document.querySelector('#app');
            this.render();
        }

        getTemplate(data) {
            return `<h2>${data.name}</h2>`;
        };

        refresh() {
            console.debug('[-] BoardComponent#refresh');
            this.$element.parentNode.removeChild(this.$element);
            this.render();
        }
    }

    root.app.BoardComponent = BoardComponent;
}(this));
