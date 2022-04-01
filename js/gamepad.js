/* ------------------ */
/* GAMEPAD WEB DRIVER */
/* ------------------ */

'use strict'

/* ------- */
/* GAMEPAD */
/* ------- */

class Gamepad {

    constructor(item) {
        this.gamepad = item;
        this.interval = setInterval(this._update, 100);
    };

    _update = () => {
        let gamepads = navigator.getGamepads();
        this.gamepad = gamepads[this.gamepad.index];

        this._gamepadHandler();
    };

    _gamepadHandler = () => {
        console.log(this.gamepad);
    };
};

/* --------------- */
/* GAMEPAD EXAMPLE */
/* --------------- */

class ActiveGamepad extends Gamepad {

    constructor(item, container) {
        super();

        this.gamepad = item;
        this.container = document.querySelector(`.${container}`);

        this.interval = setInterval(this._update, 1);
    };

    _gamepadHandler = () => {
        this.container.innerHTML = `
                                <h3>GamePad ${this.gamepad.index}</h3>
                                <span>${this.gamepad.id}</span>
                                <br />
                                <span class="${this.gamepad.buttons[0].value ? 'pressed' : ''}">Key A</span>
                                <span class="${this.gamepad.buttons[1].value ? 'pressed' : ''}">Key B</span>
                                <span class="${this.gamepad.buttons[2].value ? 'pressed' : ''}">Key X</span>
                                <span class="${this.gamepad.buttons[3].value ? 'pressed' : ''}">Key Y</span>
                                <br />
                                <span class="${this.gamepad.buttons[4].value ? 'pressed' : ''}">Key LB</span>
                                <span class="${this.gamepad.buttons[5].value ? 'pressed' : ''}">Key RB</span>
                                <span class="${this.gamepad.buttons[6].value ? 'pressed' : ''}">Key LT</span>
                                <span class="${this.gamepad.buttons[7].value ? 'pressed' : ''}">Key RT</span>
                                <br />
                                <span class="${this.gamepad.buttons[8].value ? 'pressed' : ''}">Key Back</span>
                                <span class="${this.gamepad.buttons[9].value ? 'pressed' : ''}">Key Start</span>
                                <span class="${this.gamepad.buttons[10].value ? 'pressed' : ''}">Key at Left Stick</span>
                                <span class="${this.gamepad.buttons[11].value ? 'pressed' : ''}">Key at Right Stick</span>
                                <br />
                                <span class="${this.gamepad.buttons[12].value ? 'pressed' : ''}">Key Forward</span>
                                <span class="${this.gamepad.buttons[13].value ? 'pressed' : ''}">Key Backward</span>
                                <span class="${this.gamepad.buttons[14].value ? 'pressed' : ''}">Key Left</span>
                                <span class="${this.gamepad.buttons[15].value ? 'pressed' : ''}">Key Right</span>
                                <br />
                                <span>Left Stick X: ${this.gamepad.axes[0] ? this.gamepad.axes[0] : ''}</span>
                                <span>Left Stick Y: ${this.gamepad.axes[1] ? this.gamepad.axes[1] : ''}</span>
                                <span>Right Stick X: ${this.gamepad.axes[2] ? this.gamepad.axes[2] : ''}</span>
                                <span>Right Stick Y: ${this.gamepad.axes[3] ? this.gamepad.axes[3] : ''}</span>`;
    };
};

/* -------------- */
/* GAMEPAD DRIVER */
/* -------------- */

class GamepadDriver {

    constructor(container) {
        this.container = container;
        this._init();
    };

    _init = () => {
        if (!this._checkGamepadSupport()) {
            console.log(`This browser does not support of gamepads`);
            return;
        };

        this.gamepads = [];

        this._connectGamepads();
        this._disconnectGamepads();
    };

    _checkGamepadSupport = () => {
        return 'getGamepads' in window.navigator;
    };

    _connectGamepads = () => {
        window.addEventListener('gamepadconnected', (event) => {

            let gamepadContainer = document.createElement('section');
            gamepadContainer.classList.add(`output-gamepad-${event.gamepad.index}`);
            this.container.appendChild(gamepadContainer);

            this.gamepads.push(new ActiveGamepad(event.gamepad, `output-gamepad-${event.gamepad.index}`));
            console.log(`A new gamepad has been connected at index ${event.gamepad.index}.`);
        });
    };

    _disconnectGamepads = () => {
        window.addEventListener('gamepaddisconnected', (event) => {
            this.gamepads.forEach((item, index) => {
                if (item.gamepad.id === event.gamepad.id) {
                    clearInterval(this.gamepads[index].interval);
                    this.gamepads.splice(index, 1);
                };
            });
            console.log(`The gamepad with index ${event.gamepad.index} has been disabled.`);
        });
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const OUTPUT = document.querySelector('.output-wrapper');
const GAMEPAD_DRIVER = new GamepadDriver(OUTPUT);

