class Main{
    constructor(conf){
        this.element = conf.element;
        this.load = conf.load;
    }

    loadUserInfo(){
        const userInfo = document.createElement("div");
        userInfo.setAttribute("id","top-menu")
        userInfo.innerHTML = 
        `<span class="username">Okogikam</span>
        <button class="btn btn-secondary btn-sm  setting">
            <i class="fa-solid fa-gear"></i>
        </button>`
        this.element.appendChild(userInfo);
    }

    loadGameInfo(){
        const gameInfo = document.createElement("div");
        gameInfo.setAttribute("id","board");
        gameInfo.innerHTML = 
        `<div class="row">
            <div class="col-3">
                <div class="card">
                    <img class="card-img" src="./img/lv_1.jpeg" alt="">
                    <span>Stg 1</span>
                </div>
            </div>
        </div>`
        this.element.appendChild(gameInfo);
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

    async init(){
        this.loadUserInfo();
        this.loadGameInfo();
        this.loadAside();

        this.load.classList.add("d-none");
    }
}