class Down implements Behaviour{
    private snake:Snake
    constructor(s:Snake){
        s.yspeed = 10
        s.xspeed = 0
        this.snake = s
    }

    update(): void {
        this.snake.y = this.snake.y + this.snake.yspeed
        this.snake.style.transform =`translate(${this.snake.x}px,${this.snake.y}px)`
        this.oldLocation()
    }

    private oldLocation(){
        if(this.snake.y %40 == 0){
            this.snake.getTrail(this.snake.x,this.snake.y)
        }
    }
}