//Require dependencis
const five  = require('johnny-five');
const board = new five.Board();
const keypress = require('keypress');
const Rover  = require('./Rover');

board.on('ready', function () {
    // 1. Instantiate Motors
    const motors = new five.Motors([
        {pins: { dir: 12, pwm: 11 }, invertPWM: true},
        {pins: { dir: 4, pwm: 5 }, ivertPWM: true}
    ])

    // 2. Instantiate Rover, using Motors
    const rover = new Rover(motors);
    
    // 3. Confiure 'keypress' to generate events on keypresses in the REPL
    keypress(process.stdin);
    process.stdin.setEncoding('utf8');
    
    // 4. Listen for 'keypress' events and incoke appropriate Rover methods
    process.stdin.on('keypress', function (ch, key) {

        if (!key) {return;}
        
        switch (key.name) {
            case 'q':
                rover.stop();
                console.log('Bye-bye');
                process.exit();
                break;
            case 'up':
                rover.forward();
                break;
            case 'down':
                rover.backward();
                break;
            case 'left':
                rover.left();
                break;
            case 'right':
                rover.right();
                break;
            case 'space':
                rover.stop();
                break;
            default:
                return;
        }
    })
});

