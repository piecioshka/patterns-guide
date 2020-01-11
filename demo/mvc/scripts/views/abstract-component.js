(function (root) {
    'use strict';

    root.app = root.app || {};

    class AbstractComponent {
        render() {
            let template = this.getTemplate(this.model);
            let parser = new DOMParser();
            let $document = parser.parseFromString(template, 'text/html');
            let $element = $document.body.firstElementChild;
            this.$element = this._$target.appendChild($element);
        }
    }

    root.app.AbstractComponent = AbstractComponent;
}(this));
