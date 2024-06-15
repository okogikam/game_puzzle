class Music{
    constructor(config){
        this.bgm = config.bgm;
        this.click = config.click;
        this.clear = config.clear;
    }

    Click(){        
        this.click.play();        
        return new Promise((resolve)=>{
            setTimeout(()=>resolve("music done"),this.click.duration*1000)
        })
    }
    Clear(){
        this.clear.play();        
        return new Promise((resolve)=>{
            setTimeout(()=>resolve("music done"),this.clear.duration*1000)
        })
    }
    Bgm(){
        this.bgm.load();
        this.bgm.play(); 
        this.bgm.loop = true;
    }
    bgmStop(){
        this.bgm.pause();
    }
}