(function (root) {
    'use strict';

    root.app = root.app || {};

    class AppComponent {

        get template() {
            return `
                <div>
                    <input type="text" placeholder="Enter text..." autofocus/>
                    <p></p>
                </div>
            `;
        };

        render(model, $target) {
            const $el = new DOMParser()
                .parseFromString(this.template, 'text/html')
                .body.firstElementChild;
            $target.appendChild($el);

            const $p = $el.querySelector('p');
            $el.addEventListener('input', ({ target: { value } }) => {
                model.setName(value);
                $p.textContent = value;
            });
        }
    }

    root.app.AppComponent = AppComponent;
}(this));
