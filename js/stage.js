class Stage{
    constructor(conf){
        this.stage = conf.image;
        this.url = conf.image.url;
        this.width = conf.image.width;
        this.height = conf.image.height;
        this.status = conf.status;
        this.element = conf.main.element;
        this.music = conf.main.music;
        this.main = conf.main;
        this.defaultImg = new Image();
        this.defaultImg.src = "./img/default.png";
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
                <div class="card-body p-0 m-0">
                    <img class="card-img" src="./img/default.png" alt="">
                </div>
                <div class="card-footer p-0 m-0">
                    <span>${this.stage.imgId}</span>
                </div>
            </div>`
            element.appendChild(gameInfo);
        }else{
            gameInfo.innerHTML = 
            `<div class="card">
                <div class="card-body p-0 m-0">
                    <img class="card-img" src="${this.url}" alt="">
                </div>
                <div class="card-footer p-0 m-0">
                    <span>${this.stage.imgId}</span>
                </div>
            </div>`
            element.appendChild(gameInfo);
            console.log(this.defaultImg);
            gameInfo.addEventListener("click",async ()=>{
                this.main.loadingIn();                     
                this.playStage();
                this.main.loadingOut();
                setTimeout(()=>{
                    this.main.music.Bgm();
                },500)
            })
        }
    }

    ceackStageCondition(condition){
        let cond = 0
        for(let i = 0; i < condition.length; i++){
            Object.keys(condition[i]).forEach((index)=>{
                if(index === "clear"){
                    if(condition[i][index] <= this.main.dataUser.stageClear.length){
                        cond += 1;
                    }
                }
                if(index === "stage"){
                    if(this.main.dataUser.stageClear.includes(condition[i][index])){
                        cond += 1;
                    }
                }
            })
        }
        if(cond == condition.length || this.main.dataUser.userType === "GM"){
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