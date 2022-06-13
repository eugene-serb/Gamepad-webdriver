/* -------------- */
/* GAMEPAD MASTER */
/* -------------- */

'use strict';

class Gamepad {
    constructor(gamepad) {
        this.gamepad = gamepad;
    };
    update = () => {
        let gamepads = navigator.getGamepads();
        this.gamepad = gamepads[this.gamepad.index];
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
            this.$message.innerText = `This browser does not support of gamepads.`;
            return;
        } else {
            console.log(`Press any gamepad's button or connect new gamepad.`);
            this.$message.innerText = `Press any gamepad's button or connect new gamepad.`;
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
            this.$messageBox.setAttribute('hidden', 'hidden');
            this.gamepads.forEach(item => {
                item.update();
            });
        } else {
            this.$messageBox.removeAttribute('hidden', 'hidden');
        };
    };
    draw = () => {
        this.$OUTPUT.innerHTML = '';
        if (this.gamepads.length > 0) {
            this.gamepads.forEach(item => {
                this.$OUTPUT.innerHTML += `
                <section class="output-gamepad">
                    <h3>GamePad ${item.gamepad.index}</h3>
                    <span>${item.gamepad.id}</span>
                    <br />
                    <span class="${item.gamepad.buttons[0].value ? 'pressed' : ''}">Key A</span>
                    <span class="${item.gamepad.buttons[1].value ? 'pressed' : ''}">Key B</span>
                    <span class="${item.gamepad.buttons[2].value ? 'pressed' : ''}">Key X</span>
                    <span class="${item.gamepad.buttons[3].value ? 'pressed' : ''}">Key Y</span>
                    <br />
                    <span class="${item.gamepad.buttons[4].value ? 'pressed' : ''}">Key LB</span>
                    <span class="${item.gamepad.buttons[5].value ? 'pressed' : ''}">Key RB</span>
                    <span class="${item.gamepad.buttons[6].value ? 'pressed' : ''}">Key LT</span>
                    <span class="${item.gamepad.buttons[7].value ? 'pressed' : ''}">Key RT</span>
                    <br />
                    <span class="${item.gamepad.buttons[8].value ? 'pressed' : ''}">Key Back</span>
                    <span class="${item.gamepad.buttons[9].value ? 'pressed' : ''}">Key Start</span>
                    <span class="${item.gamepad.buttons[10].value ? 'pressed' : ''}">Key at Left Stick</span>
                    <span class="${item.gamepad.buttons[11].value ? 'pressed' : ''}">Key at Right Stick</span>
                    <br />
                    <span class="${item.gamepad.buttons[12].value ? 'pressed' : ''}">Key Forward</span>
                    <span class="${item.gamepad.buttons[13].value ? 'pressed' : ''}">Key Backward</span>
                    <span class="${item.gamepad.buttons[14].value ? 'pressed' : ''}">Key Left</span>
                    <span class="${item.gamepad.buttons[15].value ? 'pressed' : ''}">Key Right</span>
                    <br />
                    <span>Left Stick X: ${item.gamepad.axes[0] ? item.gamepad.axes[0] : 'missing'}</span>
                    <span>Left Stick Y: ${item.gamepad.axes[1] ? item.gamepad.axes[1] : 'missing'}</span>
                    <span>Right Stick X: ${item.gamepad.axes[2] ? item.gamepad.axes[2] : 'missing'}</span>
                    <span>Right Stick Y: ${item.gamepad.axes[3] ? item.gamepad.axes[3] : 'missing'}</span>
                    <br />
                    <span>Vibration Actuator: ${item.gamepad.vibrationActuator ? 'Available' : 'missing'}</span>
                    <span>${item.gamepad.vibrationActuator ? 'Press LB + RB for testing Vibration Actuator' : ''}</span>
                </section>`;
            });
        };
    };
    eventHandler = () => {
        if (this.gamepads.length > 0) {
            this.gamepads.forEach(item => {
                if (item.gamepad.buttons[4].pressed === true &&
                    item.gamepad.buttons[5].pressed === true) {
                    item.gamepad.vibrationActuator.playEffect('dual-rumble', {
                        startDelay: 0,
                        duration: 500,
                        weakMagnitude: 1.0,
                        strongMagnitude: 1.0,
                    });
                };
            });
        };
    };

    checkGamepadSupport = () => {
        return 'getGamepads' in window.navigator;
    };

    #DOMs = () => {
        this.$OUTPUT = document.querySelector('.output-wrapper');
        this.$message = document.querySelector('#message');
        this.$messageBox = document.querySelector('.gamepad-message');
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

