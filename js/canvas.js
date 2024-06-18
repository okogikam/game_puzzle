class Canvas{
    constructor (conf){
        this.canvas = conf.canvas
        this.img = conf.img;
        this.ctx = this.canvas.getContext("2d");
        this.width = conf.width;
        this.game = conf.game;
    }

    draw(data){
        this.ctx.clearRect(0,0,this.width,this.width);

        Object.keys(data).forEach(dt=>{
            let imgWidth = Math.floor(this.game.imgWidth/this.game.piece);
            let canvasWidth = Math.floor(this.width/this.game.piece);
            let [x,y]= dt.split(",");
            if(data[dt] != "blank"){
                this.ctx.drawImage(
                    this.img,
                    data[dt][0]*imgWidth,
                    data[dt][1]*imgWidth,
                    imgWidth,
                    imgWidth,
                    x*canvasWidth,
                    y*canvasWidth,
                    canvasWidth,
                    canvasWidth
                )
            }
        })
    }
    drawFull(){
        this.ctx.clearRect(0,0,this.width,this.width);
        this.ctx.drawImage(this.img,0,0,this.game.imgWidth,this.game.imgWidth,0,0,this.width,this.width)
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}