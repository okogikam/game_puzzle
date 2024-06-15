class Main{
    constructor(conf){
        this.element = conf.element;
        this.load = conf.load;
        this.ready = false;
        this.userReady = false;
        this.imgReady = false;
        this.progressReady = false;
        this.stage = [];
        this.dataUser = [];
        this.music = [];
    }

    async loadData(){
        let dtUser = await fetch("./data/userData.json");
        dtUser = await dtUser.json();
        if(dtUser){
            this.userReady = true;
            this.dataUser = dtUser[0];            
        }
        let dtImg = await fetch("./data/imgData.json");
        dtImg = await dtImg.json();
        if(dtImg){
            this.imgReady = true;
            dtImg.forEach(img => {
                let stImage = new Stage({
                    Main: this,
                    image: img
                });
                this.stage.push(stImage);
            });
        }
        let dtProgres = await fetch("./data/userProgress.json");
        dtProgres = await dtProgres.json();

        if(dtProgres){
            this.progressReady = true;
        }
    }

    loadUserInfo(){
        const userInfo = document.createElement("div");
        userInfo.setAttribute("id","top-menu")
        userInfo.innerHTML = 
        `<span class="username">${this.dataUser['userName']}</span>
        <!--<button class="btn btn-secondary btn-sm  setting">
            <i class="fa-solid fa-gear"></i>
        </button>-->`
        this.element.appendChild(userInfo);
    }

    loadGameInfo(){
        let stageConteiner = document.createElement("div");
        stageConteiner.setAttribute("id","stage-conteiner");
        stageConteiner.setAttribute("class","row p-2");
        Object.values(this.stage).forEach((st)=>{
            st.display(stageConteiner);
        })
        this.element.appendChild(stageConteiner);
    }

    loadAside(){
        const aside = document.createElement("div");
        aside.setAttribute("id","aside");
        aside.innerHTML = 
        `<div id="music">
            <audio id="bgm" >
                <source src="./musics/bgm.mp3">
            </audio>
            <audio id="click">
                <source src="./musics/click_2.wav">
            </audio>
            <audio id="clear" >
                <source src="./musics/completed.wav">
            </audio>
        </div>`
        this.element.appendChild(aside);

        this.music = new Music({
            bgm: aside.querySelector("#bgm"),
            click: aside.querySelector("#click"),
            clear: aside.querySelector("#clear")
        });
        // this.music.Bgm();
    }
    async gameLoop(){
        if(!this.ready){
            this.element.innerHTML = "";
            this.loadAside();
            this.loadUserInfo();
            this.loadGameInfo(); 
        }
        // this.updateStage();
        if(this.userReady && this.imgReady && this.progressReady){            
            this.ready = true;
            this.load.classList.add("d-none");
        }

        requestAnimationFrame(()=>{            
            this.gameLoop();
        })
    }
    updateStage(){
        this.element.innerHTML = "";
        this.loadAside();
        this.loadUserInfo();
        this.loadGameInfo(); 
    }
    async init(){        
        this.loadData()        
        this.gameLoop() 
    }
}