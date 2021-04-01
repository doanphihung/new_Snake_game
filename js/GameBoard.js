const box = 20;

class Gameboard {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.init();
        this.loop();
    }

    init() {
        this.canvas = document.getElementById('myCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.snake = new Snake(this);
        this.food = new Food(this);
    }
    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 100);
    }

    update() {
        this.snake.update();
        if (this.snake.eat(this.food.x, this.food.y)) {
            this.food.update()
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.snake.draw();
        this.food.draw();
    }


}

let gameboard = new Gameboard();




