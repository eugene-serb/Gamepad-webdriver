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

        let buttonName = 'has-no-name';

        switch (button) {
            case 0:
                buttonName = 'A';
                break;
            case 1:
                buttonName = 'B';
                break;
            case 2:
                buttonName = 'X';
                break;
            case 3:
                buttonName = 'Y';
                break
            case 4:
                buttonName = 'L1';
                break;
            case 5:
                buttonName = 'R1';
                break;
            case 6:
                buttonName = 'L2';
                break;
            case 7:
                buttonName = 'R2';
                break;
            case 8:
                buttonName = 'Select';
                break;
            case 9:
                buttonName = 'Start';
                break;
            case 10:
                buttonName = 'at Left Stick';
                break;
            case 11:
                buttonName = 'at Right Stick';
                break;
            case 12:
                buttonName = 'Forward';
                break;
            case 13:
                buttonName = 'Backward';
                break;
            case 14:
                buttonName = 'Left';
                break;
            case 15:
                buttonName = 'Right';
                break;
            default:
                break;
        };

        OUTPUT.textContent = `Key ${buttonName} on Gamepad ${this.gamepad.index} was pressed`;
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

const OUTPUT = document.querySelector('#gamepad-output');
const GAMEPAD_DRIVER = new GamepadDriver();

