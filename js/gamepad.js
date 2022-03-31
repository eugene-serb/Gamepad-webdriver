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

        let isPressed = false;
        let button;

        this.gamepad.buttons.forEach((item, index) => {
            if (item.value === 1) {
                button = index;
                isPressed = true;
            };
        });

        if (!isPressed) {
            return;
        } else {
            this._gamepadHandler(button);
        };
    };

    _gamepadHandler = (button) => {
        switch (button) {
            case 0:
                OUTPUT.textContent = `Key A on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 1:
                OUTPUT.textContent = `Key B on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 2:
                OUTPUT.textContent = `Key X on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 3:
                OUTPUT.textContent = `Key Y on Gamepad ${this.gamepad.index} was pressed`;
                break
            case 4:
                OUTPUT.textContent = `Key L1 on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 5:
                OUTPUT.textContent = `Key R1 on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 6:
                OUTPUT.textContent = `Key L2 on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 7:
                OUTPUT.textContent = `Key R2 on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 8:
                OUTPUT.textContent = `Key Select on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 9:
                OUTPUT.textContent = `Key Start on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 10:
                OUTPUT.textContent = `Key at Left Stick on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 11:
                OUTPUT.textContent = `Key at Right Stick on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 12:
                OUTPUT.textContent = `Key Forward on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 13:
                OUTPUT.textContent = `Key Backward on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 14:
                OUTPUT.textContent = `Key Left on Gamepad ${this.gamepad.index} was pressed`;
                break;
            case 15:
                OUTPUT.textContent = `Key Right on Gamepad ${this.gamepad.index} was pressed`;
                break;
            default:
                OUTPUT.textContent = `Key HUEVOZNAET on Gamepad ${this.gamepad.index} was pressed`;
                break;
        };
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
            this.gamepads.push(new Gamepad(event.gamepad));
        });
    };

    _disconnectGamepads = () => {
        window.addEventListener('gamepaddisconnected', (event) => {

            console.log(`Disconnect of gamepad at index ${event.gamepad.index} was happened.`);

            this.gamepads.forEach((item, index) => {
                if (item.gamepad.id === event.gamepad.id) {
                    clearInterval(this.gamepads[index].interval);
                    this.gamepads.splice(index, 1);
                };
            });

        });
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const OUTPUT = document.querySelector('#gamepad-output');
const GAMEPAD_DRIVER = new GamepadDriver();

