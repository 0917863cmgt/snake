class Grow implements Behaviour {
    public trail:number[][]=[];
    constructor(s:Snake){
        for(let i=s.order;i<s.order+5;i++){
            Game.gameObjects.push(new Tail(i,s))
            // console.log(i, s.order, s.order+5)
        }
        s.order = s.order+5
        // console.log("total", s.order)
        // this.trail = s.getTrail()
        // console.log(this.trail[1])
        // for(let o of Game.gameObjects){
        //     if(o instanceof Tail) {
        //         o.follow()
        //     }
        // }
    }

    update(): void {

    }
}