(function (root) {
    'use strict';

    root.app = root.app || {};

    let AbstractComponent = root.app.AbstractComponent;

    class InputComponent extends AbstractComponent {
        constructor(model) {
            console.debug('[+] new InputComponent');
            super();
            this.model = model;
            this.$element = null;
            this._$target = document.querySelector('#app');
            this.render();

            this.$element.focus();
            this.onInput(this._setModelName.bind(this));
        }

        getTemplate() {
            return `<input type="text" placeholder="Enter text..."/>`;
        };

        onInput(callback) {
            this.$element.addEventListener('input', callback);
        }

        _setModelName(evt) {
            this.model.setName(evt.target.value);
        }
    }

    root.app.InputComponent = InputComponent;
}(this));
