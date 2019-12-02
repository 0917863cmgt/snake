class GameObject extends HTMLElement {

    public div: HTMLElement;
    public parent: HTMLElement;
    public x:number = 0;
    public y:number = 0;
    public xspeed:number = 0;
    public yspeed:number = 0;
    public speedmultiplier:number = 1;
    public width:number;
    public height:number;
    public direction:number = 1;

    constructor() {
        super()
        this.div = this
        document.body.appendChild(this)
    }

    public update():void {
        
    }

}