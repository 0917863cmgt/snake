class Game {
    private static gameInstance: Game
    public static gameObjects: GameObject[] = [] 
    public static fruit: Fruit;
    public static totalBlocks: number;
    public static main:any = document.querySelector("main")
    public static html:any = document.querySelector(".container.c-section.section--border")
    public static bool:boolean = false
    constructor(){
        Game.html.style.display = "hidden"
        Game.addElements()
        Game.fruit = new Fruit()
        Game.gameObjects.push(Game.fruit)
        Game.gameObjects.push(new Snake(Game.fruit))
        if (! Game.gameInstance) {
            Game.gameLoop()
        }
    }

    public static gameLoop(){
        if(Game.bool==false){
            for(let o of Game.gameObjects){
                if(o instanceof Snake) {
                    o.update()
                }
    
                if(o instanceof Tail) {
                    o.follow()
                    o.update()
                }
                if(o instanceof Fruit) {
                    o.update()
                }
            }
            if(!Game.fruit){
                this.fruit = new Fruit()
                Game.gameObjects.push(this.fruit)
            }
        }
        requestAnimationFrame(() => this.gameLoop())
    }

    public static singleton(){
        if (! Game.gameInstance) {
            Game.gameInstance = new Game()
        }
        if(Game.bool == true){
            Object.assign(Game.gameInstance, new Game())
            Game.bool = false
        }
        return Game.gameInstance;
    }

    public static addElements(){
        let back = document.createElement("background")
        Game.main.appendChild(back)

        let fore = document.createElement("foreground")
        Game.main.appendChild(fore)
    }

    public static gameOver(){
        Game.gameOverscreen()
    }

    public static gameOverscreen(){
        let button = document.createElement("a")
        button.textContent = "Klik hier om opnieuw te spelen"
        Game.main.appendChild(button)

        let button2 = document.createElement("a")
        button2.textContent = "Klik hier te stoppen"
        Game.main.appendChild(button2)

        button2.addEventListener("click", function(){
            Game.backto404()
            Game.main.removeChild(button)
            Game.main.removeChild(button2)
        })
        button.addEventListener("click",function(){
            Game.newGame()
            Game.main.removeChild(button)
            Game.main.removeChild(button2)
        })
    }

    public static removeElements(){
        for(let o of Game.gameObjects){
            o.remove()
        }
        Game.gameObjects = []
        let fore =document.querySelector("foreground")
        Game.main.removeChild(fore)
        let back =document.querySelector("background")
        Game.main.removeChild(back)
    }
    public static backto404(){
        this.removeElements()
        this.html.style.display = "block"
    }

    public static newGame(){
        this.removeElements()
        setTimeout(Game.singleton,100)
    }

}
window.addEventListener("load", () => {
    Game.singleton();
}) 