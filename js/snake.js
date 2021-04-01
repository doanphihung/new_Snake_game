let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();
let score = 0;

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

class Snake {
    constructor(gameboard) {
        this.gameboard = gameboard;
        this.x = 8 * box;
        this.y = 9 * box;
        this.box = box;
        this.Xsnake = this.box;
        this.Ysnake = 0;
        this.cellSnake = [];
        this.firstSnake = 2;
    }

    update() {
        if (this.endGame()) {
            this.x += this.Xsnake;
            this.y += this.Ysnake;
        }
        if (this.x >= this.gameboard.canvas.width) {
            this.x = 0;
        } else if (this.x > 0) {
            this.x = this.gameboard.canvas.width;
        } else if (this.y <= this.gameboard.canvas.height) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = this.gameboard.canvas.height;
        }
        this.cellSnake.unshift({x: this.x, y: this.y});
        if (this.cellSnake.length > this.firstSnake) {
            this.cellSnake.pop();
        }
        this.direction();
    }

    draw() {
        for (let i = 0; i < this.cellSnake.length; i++) {
            this.gameboard.ctx.fillStyle = (i === 0) ? '#ac1e3f' : '#b8a728';
            this.gameboard.ctx.fillRect(this.cellSnake[i].x, this.cellSnake[i].y, this.box, this.box);
            this.gameboard.ctx.strokeStyle = 'red';
            this.gameboard.ctx.strokeRect(this.cellSnake[i].x, this.cellSnake[i].y, box, box);
            // score
            this.gameboard.ctx.fillStyle = 'white';
            this.gameboard.ctx.font = "15px Verdana";
            this.gameboard.ctx.fillText('Score: ' + score, +box - 5, box - 5);
        }
        if (!this.endGame()) {
            this.gameboard.ctx.font = "50px Verdana";
            let gradient = this.gameboard.ctx.createLinearGradient(0, 0, this.gameboard.canvas.width, 0);
            gradient.addColorStop("0", " magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            this.gameboard.ctx.fillStyle = gradient;
            this.gameboard.ctx.fillText("Game Over!", this.gameboard.canvas.width / 6, this.gameboard.canvas.height / 2);
        }
    }
    direction() {
        document.addEventListener('keydown', (evt) => {
            if (evt.which === 37 && this.Xsnake === 0) {
                this.Xsnake = -this.box;
                this.Ysnake = 0;
                left.play();
            } else if (evt.which === 38 && this.Ysnake === 0) {
                this.Xsnake = 0;
                this.Ysnake = -this.box;
                up.play();
            } else if (evt.which === 39 && this.Xsnake === 0) {
                this.Xsnake = this.box;
                this.Ysnake = 0;
                right.play();
            } else if (evt.which === 40 && this.Ysnake === 0) {
                this.Xsnake = 0;
                this.Ysnake = this.box;
                down.play();
            }
        });
    }

    eat(x, y) {   //x,y toa do food
        if (this.x === x && this.y === y) {
            this.firstSnake++
            score++
            eat.play();
            return true;
        }
        return false;
    }

    endGame() {
        for (let i = 1; i < this.cellSnake.length; i++) {
             if (this.x === this.cellSnake[i].x && this.y === this.cellSnake[i].y) {
                return false;
            }
        }
        return true;
    }
}
