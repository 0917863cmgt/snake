"use strict";
class Death {
    constructor() {
    }
    update() {
        throw new Error("Method not implemented.");
    }
}
class Down {
    constructor(s) {
        s.yspeed = 10;
        s.xspeed = 0;
        this.snake = s;
    }
    update() {
        this.snake.y = this.snake.y + this.snake.yspeed;
        this.snake.style.transform = `translate(${this.snake.x}px,${this.snake.y}px)`;
        this.oldLocation();
    }
    oldLocation() {
        if (this.snake.y % 40 == 0) {
            this.snake.getTrail(this.snake.x, this.snake.y);
        }
    }
}
class Eat {
    constructor(s, f) {
        let parent = document.querySelector("background");
        parent.removeChild(f);
        Game.gameObjects.splice(Game.gameObjects.indexOf(f), 1);
        Game.fruit = new Fruit(s);
        s.fruit = Game.fruit;
        Game.gameObjects.push(Game.fruit);
        this.snake = s;
        this.snake.behaviour = new Grow(this.snake);
    }
    update() {
    }
}
class Follow {
    constructor(t, s) {
        this.tail = t;
        this.snake = s;
    }
    update() {
        this.tail.setTrail();
        this.tail.style.transform = `translate(${this.tail.x}px,${this.tail.y}px)`;
    }
}
class GameObject extends HTMLElement {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.speedmultiplier = 1;
        this.direction = 1;
        this.div = this;
        document.body.appendChild(this);
    }
    update() {
    }
}
class Fruit extends GameObject {
    constructor(s) {
        super();
        let parent = document.querySelector("background");
        parent.appendChild(this);
        this.style.width = "40px";
        this.style.height = "40px";
        this.style.backgroundColor = "white";
        this.style.display = "block";
        this.style.position = "absolute";
        this.snake = s;
        this.x = Math.floor(40 * Math.floor(Math.random() * (window.innerWidth - 80) / 40));
        this.y = Math.floor(40 * Math.floor(Math.random() * (window.innerHeight - 80) / 40));
        this.style.transform = `translate(${this.x}px,${this.y}px)`;
    }
    update() {
        for (let o of Game.gameObjects) {
            if (o instanceof Snake) {
                if (this.checkCollision(this.getBoundingClientRect(), o.getBoundingClientRect())) {
                    console.log('reset');
                    this.x = Math.floor(40 * Math.floor(Math.random() * (window.innerWidth - 80) / 40));
                    this.y = Math.floor(40 * Math.floor(Math.random() * (window.innerHeight - 80) / 40));
                    this.style.transform = `translate(${this.x}px,${this.y}px)`;
                }
            }
            if (o instanceof Tail) {
                if (this.checkCollision(this.getBoundingClientRect(), o.getBoundingClientRect())) {
                    console.log('reset');
                    this.x = Math.floor(40 * Math.floor(Math.random() * (window.innerWidth - 80) / 40));
                    this.y = Math.floor(40 * Math.floor(Math.random() * (window.innerHeight - 80) / 40));
                    this.style.transform = `translate(${this.x}px,${this.y}px)`;
                }
            }
        }
    }
    remove() {
        let parent = document.querySelector("background");
        parent.removeChild(this);
    }
    checkCollision(a, b) {
        return (a.left == b.left &&
            a.right == b.right &&
            a.top == b.top &&
            a.bottom == b.bottom);
    }
}
window.customElements.define("fruit-component", Fruit);
class Game {
    constructor() {
        Game.addElements();
        Game.fruit = new Fruit();
        Game.gameObjects.push(Game.fruit);
        Game.gameObjects.push(new Snake(Game.fruit));
        if (!Game.gameInstance) {
            Game.gameLoop();
        }
    }
    static gameLoop() {
        if (Game.bool == false) {
            for (let o of Game.gameObjects) {
                if (o instanceof Snake) {
                    o.update();
                }
                if (o instanceof Tail) {
                    o.follow();
                    o.update();
                }
                if (o instanceof Fruit) {
                    o.update();
                }
            }
            if (!Game.fruit) {
                this.fruit = new Fruit();
                Game.gameObjects.push(this.fruit);
            }
        }
        requestAnimationFrame(() => this.gameLoop());
    }
    static singleton() {
        if (!Game.gameInstance) {
            Game.gameInstance = new Game();
        }
        if (Game.bool == true) {
            Object.assign(Game.gameInstance, new Game());
            Game.bool = false;
        }
        return Game.gameInstance;
    }
    static addElements() {
        let back = document.createElement("background");
        Game.main.appendChild(back);
        let fore = document.createElement("foreground");
        Game.main.appendChild(fore);
    }
    static gameOver() {
        Game.gameOverscreen();
    }
    static gameOverscreen() {
        let button = document.createElement("a");
        button.textContent = "Klik hier om opnieuw te spelen";
        Game.main.appendChild(button);
        let button2 = document.createElement("a");
        button2.textContent = "Klik hier te stoppen";
        Game.main.appendChild(button2);
        button2.addEventListener("click", function () {
            Game.backto404();
            Game.main.removeChild(button);
            Game.main.removeChild(button2);
        });
        button.addEventListener("click", function () {
            Game.newGame();
            Game.main.removeChild(button);
            Game.main.removeChild(button2);
        });
    }
    static removeElements() {
        for (let o of Game.gameObjects) {
            o.remove();
        }
        Game.gameObjects = [];
        let fore = document.querySelector("foreground");
        Game.main.removeChild(fore);
        let back = document.querySelector("background");
        Game.main.removeChild(back);
    }
    static backto404() {
        this.removeElements();
    }
    static newGame() {
        this.removeElements();
        setTimeout(Game.singleton, 100);
    }
}
Game.gameObjects = [];
Game.main = document.querySelector("main");
Game.html = document.querySelector(".container.c-section.section--border");
Game.bool = false;
window.addEventListener("load", () => {
    Game.singleton();
});
class Grow {
    constructor(s) {
        this.trail = [];
        for (let i = s.order; i < s.order + 5; i++) {
            Game.gameObjects.push(new Tail(i, s));
        }
        s.order = s.order + 5;
    }
    update() {
    }
}
class Idle {
    constructor(snake) {
        snake.yspeed = 0;
        snake.xspeed = 0;
        this.snake = snake;
    }
    update() {
        this.snake.style.transform = `translate(${this.snake.x}px,${this.snake.y}px)`;
    }
}
class Left {
    constructor(s) {
        s.xspeed = -10;
        s.yspeed = 0;
        this.snake = s;
    }
    update() {
        this.snake.x = this.snake.x + this.snake.xspeed;
        this.snake.style.transform = `translate(${this.snake.x}px,${this.snake.y}px)`;
        this.oldLocation();
    }
    oldLocation() {
        if (this.snake.x % 40 == 0) {
            this.snake.getTrail(this.snake.x, this.snake.y);
        }
    }
}
class Right {
    constructor(s) {
        s.xspeed = 10;
        s.yspeed = 0;
        this.snake = s;
    }
    update() {
        this.snake.x = this.snake.x + this.snake.xspeed;
        this.snake.style.transform = `translate(${this.snake.x}px,${this.snake.y}px)`;
        this.oldLocation();
    }
    oldLocation() {
        if (this.snake.x % 40 == 0) {
            this.snake.getTrail(this.snake.x, this.snake.y);
        }
    }
}
class Snake extends GameObject {
    constructor(f) {
        super();
        this.order = 1;
        this.trail = [];
        this.steps = 1;
        let parent = document.querySelector("foreground");
        this.div = document.querySelector("main");
        parent.appendChild(this);
        this.fruit = f;
        this.x = 0;
        this.y = 0;
        this.style.width = "40px";
        this.style.height = "40px";
        this.style.backgroundColor = "white";
        this.style.display = "block";
        this.style.position = "absolute";
        this.style.margin = "0";
        this.style.padding = "0";
        window.addEventListener("keydown", (e) => this.onKeyDown(e));
        this.behaviour = new Idle(this);
    }
    update() {
        this.behaviour.update();
        if (this.checkCollision(this.getBoundingClientRect(), this.fruit.getBoundingClientRect())) {
            this.speedmultiplier++;
            this.eat();
        }
        for (let o of Game.gameObjects) {
            if (o instanceof Tail) {
                if (this.checkCollision(this.getBoundingClientRect(), o.getBoundingClientRect())) {
                    Game.bool = true;
                    Game.gameOver();
                }
            }
        }
        if (this.checkCollision2(this.getBoundingClientRect(), this.div.getBoundingClientRect())) {
            Game.bool = true;
            Game.gameOver();
        }
    }
    eat() {
        this.behaviour = new Eat(this, this.fruit);
        this.onKeyDown(this.oldKey);
    }
    onKeyDown(event) {
        this.oldKey = event;
        switch (event.keyCode) {
            case 87:
                if (this.behaviour instanceof Down) {
                }
                else {
                    while (this.x % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Up(this);
                }
                break;
            case 65:
                if (this.behaviour instanceof Right) {
                }
                else {
                    while (this.y % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Left(this);
                }
                break;
            case 83:
                if (this.behaviour instanceof Up) {
                }
                else {
                    while (this.x % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Down(this);
                }
                break;
            case 68:
                if (this.behaviour instanceof Left) {
                }
                else {
                    while (this.y % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Right(this);
                }
                break;
            case 38:
                if (this.behaviour instanceof Down) {
                }
                else {
                    while (this.x % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Up(this);
                }
                break;
            case 37:
                if (this.behaviour instanceof Right) {
                }
                else {
                    while (this.y % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Left(this);
                }
                break;
            case 40:
                if (this.behaviour instanceof Up) {
                }
                else {
                    while (this.x % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Down(this);
                }
                break;
            case 39:
                if (this.behaviour instanceof Left) {
                }
                else {
                    while (this.y % 40 > 0) {
                        this.behaviour.update();
                    }
                    this.behaviour = new Right(this);
                }
                break;
        }
    }
    getSnakeBounding() {
        return this.getBoundingClientRect();
    }
    checkCollision(a, b) {
        return (a.left == b.left &&
            a.right == b.right &&
            a.top == b.top &&
            a.bottom == b.bottom);
    }
    checkCollision2(a, b) {
        return (a.left <= b.left - 1 ||
            a.right >= b.right + 1 ||
            a.top <= b.top - 1 ||
            a.bottom >= b.bottom + 1);
    }
    getTrail(x, y) {
        if (this.steps > this.order + 5) {
            this.trail.splice(this.trail.length - 1, 1);
        }
        else {
            this.steps++;
        }
        this.trail.splice(0, 0, [x, y]);
        return (this.trail);
    }
    giveTrail() {
        return (this.trail);
    }
    remove() {
        let parent = document.querySelector("foreground");
        parent.removeChild(this);
    }
}
window.customElements.define("snake-component", Snake);
class Tail extends GameObject {
    constructor(order, s) {
        super();
        this.trail = [];
        let parent = document.querySelector("foreground");
        parent.appendChild(this);
        this.snake = s;
        this.order = order;
        this.style.width = "40px";
        this.style.height = "40px";
        this.style.backgroundColor = "white";
        this.style.display = "inline-block";
        this.style.borderStyle = "solid";
        this.style.borderWidth = "1px";
        this.style.boxSizing = "border-box";
        this.style.position = "absolute";
        this.style.margin = "0";
        this.style.padding = "0";
    }
    update() {
        this.behaviour.update();
    }
    setTrail() {
        this.trail = this.snake.giveTrail();
        this.x = this.trail[this.order - 1][0];
        this.y = this.trail[this.order - 1][1];
    }
    follow() {
        this.behaviour = new Follow(this, this.snake);
    }
    remove() {
        let parent = document.querySelector("foreground");
        parent.removeChild(this);
    }
}
window.customElements.define("tail-component", Tail);
class Up {
    constructor(s) {
        s.yspeed = -10;
        s.xspeed = 0;
        this.snake = s;
    }
    update() {
        this.snake.y = this.snake.y + this.snake.yspeed;
        this.snake.style.transform = `translate(${this.snake.x}px,${this.snake.y}px)`;
        this.oldLocation();
    }
    oldLocation() {
        if (this.snake.y % 40 == 0) {
            this.snake.getTrail(this.snake.x, this.snake.y);
        }
    }
}
//# sourceMappingURL=main.js.map