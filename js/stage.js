class Stage{
    constructor(conf){
        this.stage = conf.image;
        this.url = conf.image.url;
        this.width = conf.image.width;
        this.height = conf.image.height;
        this.status = conf.status;
        this.element = conf.Main.element;
        this.music = conf.Main.music;
        this.dataUser = conf.Main.dataUser;
        this.main = conf.Main;
    }

    display(element){        
        // tampilkan stage di menu stage 
        const gameInfo = document.createElement("div");
        gameInfo.setAttribute("id","stage");
        gameInfo.setAttribute("class","col-4 col-sm-3 col-md-2 p-2");
        // this.ceackStageCondition(this.stage['condition']);
        if(!this.ceackStageCondition(this.stage['condition'])){
            gameInfo.innerHTML = 
            `<div class="card disabled">
                <img class="card-img" src="./img/default.jpeg" alt="">
                <span>${this.stage.imgId}</span>
            </div>`
            element.appendChild(gameInfo);
        }else{
            gameInfo.innerHTML = 
            `<div class="card">
                <img class="card-img" src="${this.url}" alt="">
                <span>${this.stage.imgId}</span>
            </div>`
            element.appendChild(gameInfo);

            gameInfo.addEventListener("click",()=>{
                this.playStage();
                this.music.Bgm();
            })
        }
    }

    ceackStageCondition(condition){
        let cond = 0
        for(let i = 0; i < condition.length; i++){
            Object.keys(condition[i]).forEach((index)=>{
                if(index === "clear"){
                    if(condition[i][index] <= this.dataUser.stageClear.length){
                        cond += 1;
                    }
                }
                if(index === "stage"){
                    if(this.dataUser.stageClear.includes(condition[i][index])){
                        cond += 1;
                    }
                }
            })
        }
        if(cond == condition.length){
            return true;
        }else{
            return false;
        }
    }

    playStage(){
        // tampilan stage saat dimainkan 
        const gamePlayNow = new Game({
            stage: this
        })

        gamePlayNow.loadGeme();
    }
}