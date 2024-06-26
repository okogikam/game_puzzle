class Game{
    constructor(conf){
        this.stage = conf.stage;
        this.data1 = [];
        // this.data2 = this.gameData(this.data1);
        this.clear  = false;
        this.pause = true;
        this.timeStart = false;
        this.gameHasStarted = false;
        this.time = 0;
        this.step = 0;
        this.loading =  false;
        this.showHelp = false;
        this.piece = Number(conf.stage.stage.piece);
        this.imgWidth = Number(conf.stage.stage.width);
    }

    async loadGeme(){        
        // menyiapkan game 
        this.gameData();
        const gameInfo = document.createElement("div");
        this.gameElement = gameInfo;
        gameInfo.setAttribute("id","gameBoard");
        gameInfo.innerHTML = 
        `<div class="card">
            <div class="card-header">
                <h3><button id="game_close" class="btn">
                <i class="fa-solid fa-reply"></i>
                </button>
                ${this.stage.stage.imgId}</h3>
            </div>
            <div class="card-body p-0 m-0" id="game_display">                
                <canvas id="canvas" width="400" height="400"></canvas>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-4">
                    <img id="game_img" class="card-img" src="${this.stage.url}" alt="" style="opacity:1;">
                </div>
                <div class="game-control col-8">
                    <div class="before-play">
                        <button id="game_start" class="btn">
                        <i class="fa-solid fa-circle-play"></i> Play
                        </button>
                    </div>
                    <div class="after-play d-none">
                        <button id="game_reset" class="btn"><i class="fa-solid fa-rotate-right"></i></button>
                        <button id="game_help" class="btn">
                        <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <div class="row">
                        <div class="step col-4"><i class="fa-solid fa-paw"></i>  0</div>
                        <div class="score col-7"><i class="fa-regular fa-clock"></i>  00:00:00</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>                                                  
        </div>`
        this.stage.element.appendChild(gameInfo);
        // this.imgWidth = gameInfo.querySelector("#game_img").clientWidth;
        let cardWidth = gameInfo.querySelector("#game_display").clientWidth;
        gameInfo.querySelector("#canvas").setAttribute("width",`${cardWidth}`)
        gameInfo.querySelector("#canvas").setAttribute("height",`${cardWidth}`)

        this.canvas = new Canvas({
            canvas: gameInfo.querySelector("#canvas"),
            img: gameInfo.querySelector("#game_img"),
            width: cardWidth,
            game: this
        })
        this.canvas.drawFull();

        gameInfo.querySelector("#game_start").addEventListener("click",()=>{
            if(!this.loading){
                this.gameStart(gameInfo);
                this.gameHasStarted = true;
                gameInfo.querySelector(".before-play").classList.add("d-none");
                gameInfo.querySelector(".after-play").classList.remove("d-none");

            }
        })
        gameInfo.querySelector("#game_reset").addEventListener("click",()=>{
            if(!this.gameHasStarted){
                return
            }
            if(!this.loading){ 
                this.gameReset();                       
            }
        })
        gameInfo.querySelector("#game_close").addEventListener("click",()=>{   
            if(!this.loading){
                this.stage.main.loadingIn();
                gameInfo.remove();
                this.stage.main.music.bgmStop();
                this.stage.main.updateStage();
                this.stage.main.loadingOut();
            }     
        })
        gameInfo.querySelector("#game_help").addEventListener("click",()=>{
            if(this.loading || !this.gameHasStarted ){
                return
            }
            if(!this.showHelp){
                this.showHelp = true;
                // gameInfo.querySelector("#game_img").setAttribute("style","display:block;")
                this.canvas.drawFull();
            }else{
                this.showHelp = false;
                this.canvas.draw(this.data2)
                // gameInfo.querySelector("#game_img").setAttribute("style","display:none;")
            }
        })
        gameInfo.querySelector("#canvas").addEventListener("click",async (e)=>{
            await this.stage.main.music.Click();
            this.showHelp = false;
            let cardHeaderHeight = gameInfo.querySelector(".card-header").offsetHeight; 
            if(!this.clear && !this.pause){                
                this.movePice(e.layerX,(e.layerY - cardHeaderHeight),cardWidth)
            }
        })
        
    }
    async gameClear(){
        // mengecek game clear atau tidak 
        let i = 0;
        let match = 0;
        let target = Object.keys(this.data2).length - 1;
        Object.keys(this.data2).forEach(dt=>{
            if(dt == `${this.data2[dt][0]},${this.data2[dt][1]}` && this.data2[`${this.piece - 1},${this.piece - 1}`] == "blank"){
                match += 1;
            }
            i++;
        })
        // console.log(target)
        if(match == target || this.stage.main.dataUser.userType === "GM"){            
            this.clear = true;
            this.loading = true;
            this.canvas.drawFull();
            this.stage.main.music.bgmStop();
            this.saveProgres();
            await this.stage.main.music.Clear();
            this.stage.main.music.Bgm();
            this.gameClearDialog()
            this.loading = false;
        }
    }
    gameClearDialog(){
        let div = document.createElement("div");
        div.classList.add("clear-dialog");
        div.innerHTML = `
        <div class="card p-2">
            <h3><i class="fa-solid fa-star fa-beat"></i> Cleared <i class="fa-solid fa-star fa-beat"></i></h3>
           <p>Step : ${this.step}</br>
           Time : ${this.displayTime(this.timeScore)}</p>
           <div class="card-footer">
           <button class="home btn" class="btn"><i class="fa-solid fa-reply"></i></button>
           <button class="game_reset btn" class="btn"><i class="fa-solid fa-rotate-right"></i></button>
           </div>
        </div>
        `
        div.querySelector(".home").addEventListener("click",()=>{
            this.stage.main.loadingIn();
            this.gameElement.remove();
            this.stage.main.music.bgmStop();
            this.stage.main.updateStage();
            this.stage.main.loadingOut();
        })
        div.querySelector(".game_reset").addEventListener("click",async ()=>{
            // this.gameReset(); 
            // this.stage.main.loadingIn(); 
            await this.gameReset();  
            this.canvas.draw(this.data2);
            div.remove();
            this.canvas.draw(this.data2);
            // this.stage.main.loadingOut();
        })

        this.stage.element.appendChild(div);        
    }
    async gameScore(gameInfo){
        // mencatat skor game

        if(!this.timeStart){
            this.timePlay = Date.now();
            this.timeStart = true;
        }
        if(!this.pause && !this.clear){
            let timeNow = Date.now();
            this.timeScore = this.time + (timeNow - this.timePlay);
        }
        if(this.pause && this.timeStart){
            this.time = this.timeScore;
            this.timeStart = false;
        }
        requestAnimationFrame(()=>{
            gameInfo.querySelector(".step").innerHTML = `<i class="fa-solid fa-paw"></i>  ${this.step}`;
            gameInfo.querySelector(".score").innerHTML = `<i class="fa-regular fa-clock"></i>  ${this.displayTime(this.timeScore)}`;
            this.gameScore(gameInfo);
        })

    }
    displayTime(time){
        let score = new Date(time);
        let hours,minute,second;
        if(score.getUTCHours() < 10){
            hours = `0${score.getUTCHours()}`;
        }else{
            hours = score.getUTCHours()
        }
        if(score.getMinutes() < 10){
            minute = `0${score.getMinutes()}`;
        }else{
            minute = score.getMinutes()
        }
        if(score.getSeconds() < 10){
            second = `0${score.getSeconds()}`;
        }else{
            second = score.getSeconds()
        }
        let string = `${hours}:${minute}:${second}`;
        return string;
    }
    async gameReset(){
        this.gameData();
        
        this.clear  = false;
        this.time = 0;
        this.step = 0;
        this.timeScore = 0;
        this.timePlay = Date.now();
        this.canvas.draw(this.data2);
    }
    gameStart(gameInfo){
        let div = gameInfo.querySelector("#game_start");
        if(this.pause){            
            this.pause = false;
            div.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
            this.gameScore(gameInfo);           
        }else{
            this.pause = true;
            div.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;  
        }
        this.canvas.draw(this.data2);
        // console.log(this.stage.main.data.saveProgresOnline());
    }
   async movePice(x,y,width){        
        let X = Math.floor(x/(width/this.piece));
        let Y = Math.floor(y/(width/this.piece));

        if(this.data2[`${X},${Y+1}`] == "blank"){
            this.data2[`${X},${Y+1}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
            this.step = this.step + 1;
        }else if(this.data2[`${X},${Y-1}`] == "blank"){
            this.data2[`${X},${Y-1}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
            this.step = this.step + 1;
        }else if(this.data2[`${X-1},${Y}`] == "blank"){
            this.data2[`${X-1},${Y}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
            this.step = this.step + 1;
        }else if(this.data2[`${X+1},${Y}`] == "blank"){
            this.data2[`${X+1},${Y}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
            this.step = this.step + 1;
        }
        this.canvas.draw(this.data2);

        this.gameClear()
    }
    saveProgres(){
        // menyimpan progres game 
        // localStorage.removeItem("gamePuzzleProgres");
        if(this.stage.main.dataUser.userType === "GM"){
            return;
        }   
        localStorage.removeItem("gamePuzzleProgres");
        this.stage.main.dataUser.stageClear.push(`${this.stage.stage.imgId}`)
        this.stage.main.data.saveProgresOnline({
            username: this.stage.main.dataUser.userName,
            progres: this.stage.stage.imgId,
            score: `${this.stage.stage.imgId}:${this.timeScore}`
        });
        localStorage.setItem("dataUserGamePuzzle",JSON.stringify(this.stage.main.dataUser));
    }
    gameData(array){
        this.piece = Number(this.stage.stage.piece);
        this.imgWidth = Number(this.stage.stage.width);
        let dataImgGame = {};
        let index = 0;
        let array2 = [];
        for(let x = 0; x < this.piece; x++){
            for(let y = 0 ; y < this.piece; y++){
                array2.push([x,y]);
                // this.data1.push([y, x]);
            }
        }
        let array1 = [...array2];
        for (let i = array2.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array2[i], array2[j]] = [array2[j], array2[i]]; 
          } 
        for(let x = 0; x < this.piece; x++){
            for(let y = 0 ; y < this.piece; y++){
                if(array2[index] == `${this.piece-1},${this.piece-1}`){
                    dataImgGame[`${y},${x}`] = "blank";
                }else{
                    dataImgGame[`${y},${x}`] = array2[index];
                }

                index++;
            }
        }
        if(this.cekGameArray(array1,dataImgGame)){
            this.data2 = dataImgGame
            return 
        }
        requestAnimationFrame(()=>{
            this.gameData();
        })        
    }
    cekGameArray(array1,array2){
        let dat1 = [];
        let index = [];
        let beda = -1;
        Object.values(array2).forEach((dt,key)=>{
            if(dt !== "blank"){
                let j = array1.indexOf(dt);
                dat1.push(j+1);
            }
            if(this.piece === 4 && dt === "blank"){
                beda += Math.floor(key/4);
                console.log(Math.floor(key/4));
            }
        })
        for(let i = 0; i < dat1.length - 1; i++){
            for(let j = i; j < dat1.length; j++){
                if(dat1[i] > dat1[j]){
                    beda++;
                    index.push(`${dat1[i]}-${dat1[j]}`);
                }
            }
        }
        if(beda%2 === 0){
            console.log(beda);
            console.log('ok')
            return true;
        }else{
            // console.log(beda);
            return false;
        }
    }
    gameLoop(){
        // game loop 
    }
}