class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = "../images/PNG/50-Breakout-Tiles.png";

    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y);
    }

    setPosition(i, j){
        this.x = i;
        this.y = j;
    }
}
