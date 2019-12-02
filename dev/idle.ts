class Idle implements Behaviour {
    private snake:Snake
    constructor(snake:Snake){
        snake.yspeed = 0;
        snake.xspeed = 0;
        this.snake = snake
    }

    update(): void {
        this.snake.style.transform =`translate(${this.snake.x}px,${this.snake.y}px)`
    }
}