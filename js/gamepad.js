/* ------------------ */
/* GAMEPAD WEB DRIVER */
/* ------------------ */

'use strict'

/* ------- */
/* GAMEPAD */
/* ------- */

class Gamepad {

    constructor() {
        this._init();
    };

    _init = () => {
        if (!this._checkGamepadSupport()) {
            return;
        };

        window.addEventListener('gamepadconnected', () => {

            const update = () => {
                let gamepads = navigator.getGamepads();
                let isPressed = false;
                let gamepad;
                let button;

                gamepads.forEach((gamepadItem, gamepadIndex) => {
                    if (gamepadItem !== null) {
                        gamepadItem.buttons.forEach((buttonItem, buttonIndex) => {
                            if (buttonItem.value === 1) {
                                gamepad = gamepadIndex;
                                button = buttonIndex;
                                isPressed = true;
                            };
                        });
                    };
                });

                if (!isPressed) {
                    return;
                } else {
                    this._gamepadHandler(gamepad, button);
                };
            };

            setInterval(update, 100);
        });
    };

    _checkGamepadSupport = () => {
        return 'getGamepads' in window.navigator;
    };

    _gamepadHandler = (gamepad, button) => {
        switch (button) {
            case 0:
                OUTPUT.textContent = `Key A on Gamepad #${gamepad} was pressed`;
                break;
            case 1:
                OUTPUT.textContent = `Key B on Gamepad #${gamepad} was pressed`;
                break;
            case 2:
                OUTPUT.textContent = `Key X on Gamepad #${gamepad} was pressed`;
                break;
            case 3:
                OUTPUT.textContent = `Key Y on Gamepad #${gamepad} was pressed`;
                break
            case 4:
                OUTPUT.textContent = `Key L1 on Gamepad #${gamepad} was pressed`;
                break;
            case 5:
                OUTPUT.textContent = `Key R1 on Gamepad #${gamepad} was pressed`;
                break;
            case 6:
                OUTPUT.textContent = `Key L2 on Gamepad #${gamepad} was pressed`;
                break;
            case 7:
                OUTPUT.textContent = `Key R2 on Gamepad #${gamepad} was pressed`;
                break;
            case 8:
                OUTPUT.textContent = `Key Select on Gamepad #${gamepad} was pressed`;
                break;
            case 9:
                OUTPUT.textContent = `Key Start on Gamepad #${gamepad} was pressed`;
                break;
            case 10:
                OUTPUT.textContent = `Key at Left Stick on Gamepad #${gamepad} was pressed`;
                break;
            case 11:
                OUTPUT.textContent = `Key at Right Stick on Gamepad #${gamepad} was pressed`;
                break;
            case 12:
                OUTPUT.textContent = `Key Forward on Gamepad #${gamepad} was pressed`;
                break;
            case 13:
                OUTPUT.textContent = `Key Backward on Gamepad #${gamepad} was pressed`;
                break;
            case 14:
                OUTPUT.textContent = `Key Left on Gamepad #${gamepad} was pressed`;
                break;
            case 15:
                OUTPUT.textContent = `Key Right on Gamepad #${gamepad} was pressed`;
                break;
            default:
                OUTPUT.textContent = `Key HUEVOZNAET on Gamepad #${gamepad} was pressed`;
                break;
        };
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const OUTPUT = document.querySelector('#gamepad-output');
const GAMEPAD = new Gamepad();

