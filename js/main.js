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
        this.data = new Data()
        this.login = new Login({
            main: this
        })
        // this.loginStatus = false;
        this.userLogin = "";
    }

    async loadData(){
        let dtUser = await this.data.loadDataUser(this.userLogin);
        // console.log(dtUser);
        if(dtUser){
            this.userReady = true;
            this.dataUser = dtUser;           
        }
        
        if(this.login.loginStatus && !this.imgReady){
            let dtImg = await this.data.loadDataStage();
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
    }

    loadUserInfo(){
        // console.log(this.dataUser[this.userLogin]['userName']);
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
        console.log(this.stage);
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
        console.log(this.music.bgm)
        // this.music.Bgm();
    }
    async gameLoop(){
        if(this.login.loginStatus){
            if(!this.ready){
                this.userLogin = this.login.userLogin;
                
                await this.loadData()
                console.log(this.dataUser)
                this.element.innerHTML = "";
                this.loadUserInfo();
                this.loadGameInfo(); 
                this.loadAside();
            }
            // this.updateStage();
            if(this.userReady && this.imgReady && this.progressReady){            
                this.ready = true;
                this.load.classList.add("d-none");
            }
        }else{
            this.element.innerHTML = "";
            this.login.loginPage();
            this.load.classList.add("d-none");
            return;
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
