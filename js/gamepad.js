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

class ExampleGamepad extends Gamepad {

    constructor(item) {
        super();

        this.gamepad = item;
        this.interval = setInterval(this._update, 100);
    };
    
    _gamepadHandler = () => {
        OUTPUT.innerHTML = `<span class="${this.gamepad.buttons[0].value ? 'pressed' : ''}">Key A</span>
                            <span class="${this.gamepad.buttons[1].value ? 'pressed' : ''}">Key B</span>
                            <span class="${this.gamepad.buttons[2].value ? 'pressed' : ''}">Key X</span>
                            <span class="${this.gamepad.buttons[3].value ? 'pressed' : ''}">Key Y</span>
                            <br />
                            <span class="${this.gamepad.buttons[4].value ? 'pressed' : ''}">Key L1</span>
                            <span class="${this.gamepad.buttons[5].value ? 'pressed' : ''}">Key R1</span>
                            <span class="${this.gamepad.buttons[6].value ? 'pressed' : ''}">Key L2</span>
                            <span class="${this.gamepad.buttons[7].value ? 'pressed' : ''}">Key R2</span>
                            <br />
                            <span class="${this.gamepad.buttons[8].value ? 'pressed' : ''}">Key Select</span>
                            <span class="${this.gamepad.buttons[9].value ? 'pressed' : ''}">Key Start</span>
                            <span class="${this.gamepad.buttons[10].value ? 'pressed' : ''}">Key at Left Stick</span>
                            <span class="${this.gamepad.buttons[11].value ? 'pressed' : ''}">Key at Right Stick</span>
                            <br />
                            <span class="${this.gamepad.buttons[12].value ? 'pressed' : ''}">Key Forward</span>
                            <span class="${this.gamepad.buttons[13].value ? 'pressed' : ''}">Key Backward</span>
                            <span class="${this.gamepad.buttons[14].value ? 'pressed' : ''}">Key Left</span>
                            <span class="${this.gamepad.buttons[15].value ? 'pressed' : ''}">Key Right</span>
                            <br />
                            <span>Left Axe X: ${this.gamepad.axes[0]}</span>
                            <span>Left Axe Y: ${this.gamepad.axes[1]}</span>
                            <span>Right Axe X: ${this.gamepad.axes[2]}</span>
                            <span>Right Axe Y: ${this.gamepad.axes[3]}</span>`;
    };
};

/* -------------- */
/* GAMEPAD DRIVER */
/* -------------- */

class GamepadDriver {

    constructor() {
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
            this.gamepads.push(new ExampleGamepad(event.gamepad));
            console.log(`Connection of the new gamepad at index ${event.gamepad.index} was happened.`);
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
            console.log(`Disconnecton of the gamepad at index ${event.gamepad.index} was happened.`);
        });
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const OUTPUT = document.querySelector('.output-wrapper');
const GAMEPAD_DRIVER = new GamepadDriver();

