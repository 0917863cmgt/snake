/// <reference path="gameobject.ts" />
class Snake extends GameObject{
    public behaviour:Behaviour;
    public order:number=1
    public fruit:Fruit 
    public oldKey:KeyboardEvent
    public trail:number[][]=[];
    public steps:number=1
    public div:any

    constructor(f:Fruit){
    super()

    let parent = document.querySelector("foreground")
    this.div = document.querySelector("main")
    parent.appendChild(this)
    this.fruit = f
    this.x = 0
    this.y = 0
    this.style.width = "40px"
    this.style.height = "40px";
    this.style.backgroundColor="white";
    this.style.display="block";
    this.style.position="absolute"
    this.style.margin="0"
    this.style.padding="0"
    window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e))
    this.behaviour = new Idle(this)

    // console.log(this.getBoundingClientRect())
    // console.log(this.fruit.getBoundingClientRect())
    }

    update(): void {
        this.behaviour.update()
        if(this.checkCollision(this.getBoundingClientRect(),this.fruit.getBoundingClientRect())){
            this.speedmultiplier++
            this.eat()
        }

        for(let o of Game.gameObjects){
            if(o instanceof Tail) {
                if(this.checkCollision(this.getBoundingClientRect(),o.getBoundingClientRect())){
                    Game.bool = true
                    Game.gameOver()
                }
            }
        }

        if(this.checkCollision2(this.getBoundingClientRect(),this.div.getBoundingClientRect())){
            Game.bool = true
            Game.gameOver()
        }
    }

    private eat(){
        this.behaviour=new Eat(this,this.fruit)
        // console.log(this.behaviour)
        this.onKeyDown(this.oldKey)
    }

    private onKeyDown(event:KeyboardEvent):void {
        this.oldKey = event
        // console.log(event.keyCode);
        switch (event.keyCode){
            // case 32:
            // console.log("spacebar")
            // this.behaviour = new Idle(this)
            //     break;
            case 87:
            // console.log("w")
            if(this.behaviour instanceof Down){
            }
            else{
                while(this.x %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Up(this)
            }
                break;
            case 65:
            // console.log("a")
            if(this.behaviour instanceof Right){
            } else{
                while(this.y %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Left(this)
            }
                break;
            case 83:
            // console.log("s")
            if(this.behaviour instanceof Up){
            }
            else{
                while(this.x %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Down(this)
            }
                break;
            case 68:
            // console.log("d")
            if(this.behaviour instanceof Left){
            } else{
                while(this.y %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Right(this)
            }
                break;
            case 38:
            // console.log("up-arrow")
            if(this.behaviour instanceof Down){
            }
            else{
                while(this.x %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Up(this)
            }
                break;
            case 37:
            // console.log("left-arrow")
            if(this.behaviour instanceof Right){
            } else{
                while(this.y %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Left(this)
            }
                break;
            case 40:
            // console.log("down-arrow")
            if(this.behaviour instanceof Up){
            }
            else{
                while(this.x %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Down(this)
            }
                break;
            case 39:
            // console.log("right-arrow")
            if(this.behaviour instanceof Left){
            } else{
                while(this.y %40 > 0){
                    this.behaviour.update()
                }
                this.behaviour = new Right(this)
            }
                break;
        }
     }

    public getSnakeBounding(){
        return this.getBoundingClientRect()
    }

    public checkCollision(a: ClientRect, b: ClientRect) {
        return (a.left == b.left &&
              a.right == b.right &&
              a.top == b.top &&
              a.bottom == b.bottom)
    }
    public checkCollision2(a: ClientRect, b: ClientRect) {
        return (a.left <= b.left-1 ||
              a.right >= b.right+1 ||
              a.top <= b.top-1 ||
              a.bottom >= b.bottom+1)
    }

    public getTrail(x:number,y:number){
        if(this.steps > this.order+5){
            this.trail.splice(this.trail.length-1,1)
        } else{
            this.steps++
        }
        this.trail.splice(0,0,[x,y])
        // console.log(this.trail)

        // this.trail = []
        // let x = this.x
        // let y = this.y
        // for(let o = 1; o < this.order; o++){
        //     if(x == this.x && y==this.y&& this.x %40 > 0 && this.y %40 > 0){
        //         this.behaviour.update()
        //     }   else{
        //         this.trail.push([this.x,this.y])
        //         console.log(x,y)
        //     }
        //     // let x = this.x - (o * (this.xspeed * 4))
        //     // let y = this.y - (o * (this.yspeed * 4))
        //     // console.log(x,y)
        //     // console.log(o)
        // }
        return(this.trail)
    }

    public giveTrail(){
        return(this.trail)
    }

    public remove(){
        let parent = document.querySelector("foreground")
        parent.removeChild(this)
    }
}
window.customElements.define("snake-component", Snake)