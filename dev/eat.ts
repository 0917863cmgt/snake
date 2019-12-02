class Eat implements Behaviour {
    private snake:Snake
    constructor(s:Snake,f:Fruit){
        let parent = document.querySelector("background")
        parent.removeChild(f)

        Game.gameObjects.splice(Game.gameObjects.indexOf(f), 1)

        Game.fruit = new Fruit(s);
        s.fruit = Game.fruit
        Game.gameObjects.push(Game.fruit)

        this.snake = s

        this.snake.behaviour = new Grow(this.snake)
    }
    update(): void {

    }
}