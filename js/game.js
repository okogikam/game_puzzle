class Game{
    constructor(conf){
        this.stage = conf.stage;
        this.data1 = [
            [0,0],[0,1],[0,2],[0,3],
            [1,0],[1,1],[1,2],[1,3],
            [2,0],[2,1],[2,2],[2,3],
            [3,0],[3,1],[3,2],[3,3]
        ];
        this.data2 = this.gameData(this.data1);
        this.clear  = false;
        this.pause = true;
        this.timeStart = false;
        this.time = 0;
        this.loading =  false;
        this.showHelp = false;
        this.piece = Number(conf.stage.stage.piece);
        this.imgWidth = Number(conf.stage.stage.width);
    }

    async loadGeme(){        
        // menyiapkan game 
        const gameInfo = document.createElement("div");
        gameInfo.setAttribute("id","gameBoard");
        gameInfo.innerHTML = 
        `<div class="card">
            <div class="card-header p-0">
                <h3><button id="game_close" class="btn">
                <i class="fa-solid fa-reply"></i>
                </button>
                ${this.stage.stage.imgId}</h3>
            </div>
            <div class="p-0 m-0" id="game_display">                
                <canvas id="canvas" width="400" height="400"></canvas>
            </div>
            <div class="card-footer row">
                <div class="col-4">
                    <img id="game_img" class="card-img" src="${this.stage.url}" alt="" style="opacity:1;">
                </div>
                <div class="game-control col-8">
                    <div>
                        <button id="game_start" class="btn">
                        <i class="fa-solid fa-circle-play"></i>
                        </button>
                        <button id="game_reset" class="btn"><i class="fa-solid fa-rotate-right"></i></button>
                        <button id="game_help" class="btn">
                        <i class="fa-solid fa-circle-info"></i>
                        </button>
                    </div>
                    <p class="score">00:00:00</p>
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
            }
        })
        gameInfo.querySelector("#game_reset").addEventListener("click",()=>{
            if(!this.loading){        
                this.gameReset();
            }
        })
        gameInfo.querySelector("#game_close").addEventListener("click",()=>{   
            if(!this.loading){
                gameInfo.remove();
                this.stage.main.music.bgmStop();
                this.stage.main.updateStage();
            }     
        })
        gameInfo.querySelector("#game_help").addEventListener("click",()=>{
            if(this.loading){
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
        Object.keys(this.data2).forEach(dt=>{
            if(dt == `${this.data2[dt][0]},${this.data2[dt][1]}` && this.data2["3,3"] == "blank"){
                match += 1;
            }
            i++;
        })
        if(match === 15 || this.stage.main.dataUser.userType === "GM"){            
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
           <p>Score </br> 
           ${this.displayTime(this.timeScore)}</p>
        </div>
        `
        this.stage.element.appendChild(div);
        div.addEventListener("click",()=>{
            div.remove();
        })
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
            gameInfo.querySelector(".score").innerHTML = `${this.displayTime(this.timeScore)}`;
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
    gameReset(){
        this.data2 = this.gameData(this.data1);
        this.canvas.draw(this.data2);
        this.clear  = false;
        this.time = 0;
        this.timeScore = 0;
        this.timePlay = Date.now();
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
    }
   async movePice(x,y,width){        
        let X = Math.floor(x/(width/this.piece));
        let Y = Math.floor(y/(width/this.piece));

        if(this.data2[`${X},${Y+1}`] == "blank"){
            this.data2[`${X},${Y+1}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
        }else if(this.data2[`${X},${Y-1}`] == "blank"){
            this.data2[`${X},${Y-1}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
        }else if(this.data2[`${X-1},${Y}`] == "blank"){
            this.data2[`${X-1},${Y}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
        }else if(this.data2[`${X+1},${Y}`] == "blank"){
            this.data2[`${X+1},${Y}`] = this.data2[`${X},${Y}`];
            this.data2[`${X},${Y}`] = "blank";
        }
        this.canvas.draw(this.data2);

        this.gameClear()
    }
    saveProgres(){
        // menyimpan progres game 
        // localStorage.removeItem("gamePuzzleProgres");
        if(this.stage.main.dataUser.stageClear.includes(this.stage.stage.imgId) || this.stage.main.dataUser.userType === "GM"){
            return;
        }
        localStorage.removeItem("gamePuzzleProgres");
        this.stage.main.dataUser.stageClear.push(`${this.stage.stage.imgId}`)
        let progres = this.stage.main.dataUser.stageClear;
        // console.log(progres)
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
            }
        }
        for (let i = array2.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array2[i], array2[j]] = [array2[j], array2[i]]; 
          } 
        for(let x = 0; x < this.piece; x++){
            for(let y = 0 ; y < this.piece; y++){
                if(array2[index] == `${this.piece-1},${this.piece-1}`){
                    dataImgGame[`${x},${y}`] = "blank";
                }else{
                    dataImgGame[`${x},${y}`] = array2[index];
                }

                index++;
            }
        }
        console.log(dataImgGame)
        return dataImgGame; 
    }
    gameLoop(){
        // game loop 
    }
}