/* -------------- */
/* GAMEPAD MASTER */
/* -------------- */

'use strict';

class Gamepad {
    constructor(gamepad) {
        this.unit = gamepad;
    };
    update = () => {
        let gamepads = navigator.getGamepads();
        this.unit = gamepads[this.unit.index];
    };
};

class GamepadMaster {
    constructor() {
        this.init();
    };

    init = () => {
        this.#DOMs();
        
        if (!this.checkGamepadSupport()) {
            console.log(`This browser does not support of gamepads.`);
            this.$MESSAGE.innerText = `This browser does not support of gamepads.`;
            return;
        } else {
            console.log(`Press any gamepad's button or connect new gamepad.`);
            this.$MESSAGE.innerText = `Press any gamepad's button or connect new gamepad.`;
        };

        this.gamepads = [];
        this.#eventListeners();

        this.interval = setInterval(this.eventLoop, 1);
    };

    eventLoop = () => {
        this.update();
        this.draw();
        this.eventHandler();
    };
    update = () => {
        if (this.gamepads.length > 0) {
            this.$MESSAGE_BOX.classList.add('hidden', 'hidden');
            this.gamepads.forEach(gamepad => {
                gamepad.update();
            });
        } else {
            this.$MESSAGE_BOX.classList.remove('hidden', 'hidden');
        };
    };
    draw = () => {
        this.$OUTPUT.innerHTML = '';
        if (this.gamepads.length > 0) {
            this.gamepads.forEach(gamepad => {
                this.$OUTPUT.innerHTML += `
                <section class="output-gamepad">
                    <h3>GamePad ${gamepad.unit.index}</h3>
                    <span>${gamepad.unit.id}</span>
                    <div class="gamepad-group">
                        <div>
                            <span class="${gamepad.unit.buttons[0].value === 1 ? 'pressed' : ''}">Key A</span>
                            <span class="${gamepad.unit.buttons[1].value === 1 ? 'pressed' : ''}">Key B</span>
                            <span class="${gamepad.unit.buttons[2].value === 1 ? 'pressed' : ''}">Key X</span>
                            <span class="${gamepad.unit.buttons[3].value === 1 ? 'pressed' : ''}">Key Y</span>
                        </div>
                        <div>
                            <span class="${gamepad.unit.buttons[4].value === 1 ? 'pressed' : ''}">Key LB</span>
                            <span class="${gamepad.unit.buttons[5].value === 1 ? 'pressed' : ''}">Key RB</span>
                            <span class="${gamepad.unit.buttons[6].value === 1 ? 'pressed' : ''}">Key LT</span>
                            <span class="${gamepad.unit.buttons[7].value === 1 ? 'pressed' : ''}">Key RT</span>
                        </div>
                        <div>
                            <span class="${gamepad.unit.buttons[8].value === 1 ? 'pressed' : ''}">Key Back</span>
                            <span class="${gamepad.unit.buttons[9].value === 1 ? 'pressed' : ''}">Key Start</span>
                            <span class="${gamepad.unit.buttons[10].value === 1 ? 'pressed' : ''}">Key at Left Stick</span>
                            <span class="${gamepad.unit.buttons[11].value === 1 ? 'pressed' : ''}">Key at Right Stick</span>
                        </div>
                        <div>
                            <span class="${gamepad.unit.buttons[12].value === 1 ? 'pressed' : ''}">Key Forward</span>
                            <span class="${gamepad.unit.buttons[13].value === 1 ? 'pressed' : ''}">Key Backward</span>
                            <span class="${gamepad.unit.buttons[14].value === 1 ? 'pressed' : ''}">Key Left</span>
                            <span class="${gamepad.unit.buttons[15].value === 1 ? 'pressed' : ''}">Key Right</span>
                        </div>
                        <div>
                            <span>Left Stick X: ${gamepad.unit.axes[0] === 1 ? gamepad.unit.axes[0].toFixed(2) : 'missing'}</span>
                            <span>Left Stick Y: ${gamepad.unit.axes[1] === 1 ? gamepad.unit.axes[1].toFixed(2) : 'missing'}</span>
                            <span>Right Stick X: ${gamepad.unit.axes[2] === 1 ? gamepad.unit.axes[2].toFixed(2) : 'missing'}</span>
                            <span>Right Stick Y: ${gamepad.unit.axes[3] === 1 ? gamepad.unit.axes[3].toFixed(2) : 'missing'}</span>
                        </div>
                    </div>
                    <span>Vibration Actuator: ${gamepad.unit.vibrationActuator ? 'Available' : 'missing'}</span>
                    <span>${gamepad.unit.vibrationActuator ? 'Press LB + RB to test the Vibration Actuator' : ''}</span>
                </section>`;
            });
        };
    };
    eventHandler = () => {
        if (this.gamepads.length > 0) {
            this.gamepads.forEach(gamepad => {
                if (gamepad.unit.buttons[4].pressed === true &&
                    gamepad.unit.buttons[5].pressed === true) {
                    if (gamepad.unit.vibrationActuator) {
                        gamepad.unit.vibrationActuator.playEffect('dual-rumble', {
                            startDelay: 0,
                            duration: 500,
                            weakMagnitude: 1.0,
                            strongMagnitude: 1.0,
                        });
                    };
                };
            });
        };
    };

    checkGamepadSupport = () => {
        return 'getGamepads' in window.navigator;
    };

    #DOMs = () => {
        this.$OUTPUT = document.querySelector('.output-wrapper');
        this.$MESSAGE = document.querySelector('#message');
        this.$MESSAGE_BOX = document.querySelector('.message-box');
    };
    #eventListeners = () => {
        window.addEventListener('gamepadconnected', (event) => {
            this.gamepads.push(new Gamepad(event.gamepad));
        });
        window.addEventListener('gamepaddisconnected', (event) => {
            this.gamepads.forEach((item, index) => {
                if (item.gamepad.id === event.gamepad.id) {
                    this.gamepads.splice(index, 1);
                };
            });
        });
    };
};

/* -------------- */
/* INITIALIZATION */
/* -------------- */

const GAMEPAD_MASTER = new GamepadMaster();

