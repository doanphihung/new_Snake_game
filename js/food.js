let foodImage = new Image();
foodImage.src = 'img/apple1.png'
class Food {
    constructor(gameboard) {
        this.gameboard = gameboard;
        this.x = (Math.floor(Math.random() * 20 - 1) + 1) * box;
        this.y = (Math.floor(Math.random() * 20 - 1) + 1) * box;
        // this.foodImage = foodImage;
    }
    update() {
        this.x = (Math.floor(Math.random() * 20 - 1) + 1) * box;
        this.y = (Math.floor(Math.random() * 20 - 1) + 1) * box;
    }
    draw () {
        this.gameboard.ctx.drawImage(foodImage, this.x, this.y, box, box);
    }

}