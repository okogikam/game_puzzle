class Stage{
    constructor(conf){
        this.stage = conf.image.imgId;
        this.url = conf.image.url;
        this.width = conf.image.width;
        this.height = conf.image.height;
        this.status = conf.status;
        this.element = conf.Main.element;
    }

    display(){        
        // tampilkan stage di menu stage 
        const gameInfo = document.createElement("div");
        gameInfo.setAttribute("id","stage");
        gameInfo.setAttribute("class","col-6 col-sm-2");
        gameInfo.innerHTML = 
        `<div class="card">
            <img class="card-img" src="${this.url}" alt="">
            <span>${this.stage}</span>
        </div>`
        this.element.appendChild(gameInfo);

        gameInfo.addEventListener("click",()=>{
            this.playStage();
            console.log("game start")
        })
    }

    playStage(){
        // tampilan stage saat dimainkan 
        const gamePlayNow = new Game({
            stage: this
        })

        gamePlayNow.loadGeme();
    }
}