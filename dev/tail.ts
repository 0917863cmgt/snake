/// <reference path="gameobject.ts" />
class Tail extends GameObject{
    private order:number
    public snake:Snake
    public behaviour:Behaviour;
    public trail:number[][]=[];

    constructor(order:number, s:Snake){
    super()
    let parent = document.querySelector("foreground")
    parent.appendChild(this)
    this.snake = s
    this.order = order
    this.style.width = "40px"
    this.style.height = "40px"
    this.style.backgroundColor="white"
    this.style.display="inline-block"
    this.style.borderStyle="solid"
    this.style.borderWidth="1px"
    this.style.boxSizing="border-box"
    this.style.position="absolute"
    this.style.margin="0"
    this.style.padding="0"
    }

    update(): void {
        this.behaviour.update()
    }

    public setTrail(){
    this.trail = this.snake.giveTrail()
    // console.log(this.order-1)
    this.x = this.trail[this.order-1][0]
    this.y = this.trail[this.order-1][1]
    }

    public follow(){
        this.behaviour = new Follow(this,this.snake)
    }

    public remove(){
        let parent = document.querySelector("foreground")
        parent.removeChild(this)
    }

}
window.customElements.define("tail-component", Tail)