/// <reference path="gameobject.ts" />
class Fruit extends GameObject{
    private snake:Snake
    constructor(s:Snake){
        super()
        let parent = document.querySelector("background")
        parent.appendChild(this)
        this.style.width = "40px"
        this.style.height = "40px";
        this.style.backgroundColor="white";
        this.style.display="block";
        this.style.position="absolute"
        this.snake = s
        
        this.x = Math.floor(40 * Math.floor(Math.random() * (window.innerWidth-80) / 40));
        this.y = Math.floor(40 * Math.floor(Math.random() * (window.innerHeight-80) / 40));

        // console.log(this.x, this.y)
        this.style.transform =`translate(${this.x}px,${this.y}px)`
    }

    update():void{
        for(let o of Game.gameObjects){
            if(o instanceof Snake) {
                if(this.checkCollision(this.getBoundingClientRect(),o.getBoundingClientRect())){
                    console.log('reset')
                    this.x = Math.floor(40 * Math.floor(Math.random() * (window.innerWidth-80) / 40));
                    this.y = Math.floor(40 * Math.floor(Math.random() * (window.innerHeight-80) / 40));
                    this.style.transform =`translate(${this.x}px,${this.y}px)`
                }
            }
            if(o instanceof Tail) {
                if(this.checkCollision(this.getBoundingClientRect(),o.getBoundingClientRect())){
                    console.log('reset')
                    this.x = Math.floor(40 * Math.floor(Math.random() * (window.innerWidth-80) / 40));
                    this.y = Math.floor(40 * Math.floor(Math.random() * (window.innerHeight-80) / 40));
                    this.style.transform =`translate(${this.x}px,${this.y}px)`
                }
            }
        }
    }

    public remove(){
        let parent = document.querySelector("background")
        parent.removeChild(this)
    }

    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left == b.left &&
              a.right == b.right &&
              a.top == b.top &&
              a.bottom == b.bottom)
    }
}
window.customElements.define("fruit-component", Fruit)