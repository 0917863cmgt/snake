class Follow implements Behaviour{
    private tail:Tail
    private snake:Snake
    constructor(t:Tail, s:Snake){
        this.tail = t
        this.snake = s
    }

    update(): void {
        this.tail.setTrail()
        this.tail.style.transform =`translate(${this.tail.x}px,${this.tail.y}px)`
    }
}