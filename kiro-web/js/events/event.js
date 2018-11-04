/**
 * @file EventSystemForNodeProgram
 * @author Kirononame <abdelrahman.abdelrahman101@gmail.com>
 * @version 0.1
*/

const keyDownHandlers = [];

/*
document.onkeydown = e => {
    
    if(appMode == appEnum.test)
    {
        for (const handler of keyDownHandlers) {
            handler(e);
        }
    }
}
*/

class Event {
    constructor() {
        this.handlers = [];
    }

    addHandler(handler) {
        this.handlers.push(handler);
    }

    emit() {
        for (const handler of this.handlers) {
            handler.execute();
        }
    }
}

class EventHandler {
    constructor(execute) {
        this.execute = execute;
    }
}

/*
class KeyPress {
    constructor() {
        this.pressed = new Event();
        
        keyDownHandlers.push(e => {
            this.pressed.emit();
        });
    }
}

class PrintMessage {
    constructor() {
        this.print = new EventHandler(() => {
            console.log('Hello World!');
        });
    }
}


const keyPress = new KeyPress();
const printMessage1 = new PrintMessage();
const printMessage2 = new PrintMessage();

keyPress.pressed.addHandler(printMessage1.print);
keyPress.pressed.addHandler(printMessage2.print);
*/