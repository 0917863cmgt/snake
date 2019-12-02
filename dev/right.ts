class Right implements Behaviour{
    private snake:Snake
    constructor(s:Snake){
        s.xspeed = 10
        s.yspeed = 0
        this.snake = s
    }

    update(): void {
        this.snake.x = this.snake.x + this.snake.xspeed
        this.snake.style.transform =`translate(${this.snake.x}px,${this.snake.y}px)`
        this.oldLocation()
    }

    private oldLocation(){
        if(this.snake.x %40 == 0){
            this.snake.getTrail(this.snake.x,this.snake.y)
        }
    }
}