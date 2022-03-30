/* ------------------ */
/* GAMEPAD WEB DRIVER */
/* ------------------ */

'use strict'

/* ------- */
/* GAMEPAD */
/* ------- */

class Gamepad {

    constructor() {
        this._addGamepad();
    };

    _addGamepad = () => {
        if (!this._checkGamepadSupport()) {
            return;
        };

        window.addEventListener('gamepadconnected', () => {

            const update = () => {
                let gamepads = navigator.getGamepads();
                let isPressed = false;
                let button;

                gamepads[0].buttons.forEach((item, index) => {
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

            setInterval(update, 100);
        });
    };

    _checkGamepadSupport = () => {
        return 'getGamepads' in window.navigator;
    };

    _gamepadHandler = (button) => {
        switch (button) {
            case 0:
                OUTPUT.textContent = 'Key A was pressed';
                break;
            case 1:
                OUTPUT.textContent = 'Key B was pressed';
                break;
            case 2:
                OUTPUT.textContent = 'Key X was pressed';
                break;
            case 3:
                OUTPUT.textContent = 'Key Y was pressed';
                break
            case 4:
                OUTPUT.textContent = 'Key L1 was pressed';
                break;
            case 5:
                OUTPUT.textContent = 'Key R1 was pressed';
                break;
            case 6:
                OUTPUT.textContent = 'Key L2 was pressed';
                break;
            case 7:
                OUTPUT.textContent = 'Key R2 was pressed';
                break;
            case 8:
                OUTPUT.textContent = 'Key Select was pressed';
                break;
            case 9:
                OUTPUT.textContent = 'Key Start was pressed';
                break;
            case 10:
                OUTPUT.textContent = 'Key at Left Stick was pressed';
                break;
            case 11:
                OUTPUT.textContent = 'Key at Right Stick was pressed';
                break;
            case 12:
                OUTPUT.textContent = 'Key Forward was pressed';
                break;
            case 13:
                OUTPUT.textContent = 'Key Backward was pressed';
                break;
            case 14:
                OUTPUT.textContent = 'Key Left was pressed';
                break;
            case 15:
                OUTPUT.textContent = 'Key Right was pressed';
                break;
            default:
                OUTPUT.textContent = 'Key HUEVOZNAET was pressed';
                break;
        };
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const OUTPUT = document.querySelector('#gamepad-output');
const GAMEPAD = new Gamepad();

