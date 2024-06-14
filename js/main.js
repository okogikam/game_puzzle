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
            // console.log(this.stage)
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
        console.log(this.dataUser);
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
            <audio id="bgm" src="./musics/bgm.mp3"></audio>
            <audio id="click" src="./musics/click.wav"></audio>
            <audio id="clear" src="./musics/completed.wav"></audio>
        </div>`
        this.element.appendChild(aside);
    }
    async gameLoop(){
        if(!this.ready){
            this.element.innerHTML = "";
            this.loadUserInfo();
            this.loadGameInfo(); 
        }
        
        if(this.userReady && this.imgReady && this.progressReady){            
            this.ready = true;
            this.load.classList.add("d-none");
        }

        requestAnimationFrame(()=>{            
            this.gameLoop();
        })
    }
    async init(){        
        this.loadData()        
        this.gameLoop()    
           
    }
}