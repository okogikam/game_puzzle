class Canvas{
    constructor (conf){
        this.canvas = conf.canvas
        this.img = conf.img;
        this.ctx = this.canvas.getContext("2d");
        this.width = conf.width;
    }

    draw(data){
        this.ctx.clearRect(0,0,this.width,this.width);

        Object.keys(data).forEach(dt=>{
            let imgWidth = Math.floor(1024/4);
            let canvasWidth = Math.floor(this.width/4);
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
        this.ctx.drawImage(this.img,0,0,1024,1024,0,0,this.width,this.width)
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}