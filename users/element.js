
const tagName = 'users-element';


class CustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.adoptedStyleSheets.push(this.style());
    }

    style() {
        const styleSheet = new CSSStyleSheet();
        styleSheet.insertRule('span { background: blue; color: white; }');
        return styleSheet;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['data-users'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue) {
            this.render();
        }
    }

    render() {

        const container = document.createElement('div');

        /**
         * @constant: users
         * @param: [id, name, events]
         */
        let dataUsers = this.getAttribute('data-users');
        let usersArray = [];

        if (dataUsers) {
            try {
                usersArray = JSON.parse(dataUsers);
            } catch (error) {
                console.error(error);
            }
        }

        for (let user of usersArray) {
            let userDiv = document.createElement('span');
            userDiv.id = user.id;
            userDiv.innerHTML = user.name + ", ";
            container.append(userDiv);
        }

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(container);
    }
}

customElements.define(tagName, CustomElement);