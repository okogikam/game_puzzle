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
        this.imgWidth = 0;
        this.clear  = false;
        this.pause = true;
        this.timeStart = false;
        this.time = 0;
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
                ${this.stage.stage}</h3>
            </div>
            <div class="p-0 m-0">
                <img id="game_img" class="card-img" src="${this.stage.url}" alt="" style="opacity:0;">
                <canvas id="canvas" width="400" height="400"></canvas>
            </div>
            <div class="card-footer">
                <div class="game-control">
                    <button id="game_start" class="btn">
                    <i class="fa-solid fa-circle-play"></i>
                    </button>
                    <button id="game_reset" class="btn"><i class="fa-solid fa-rotate-right"></i></button>
                    <button id="game_help" class="btn">
                    <i class="fa-solid fa-circle-info"></i>
                    </button>
                </div>
                    <p class="score">-:-:-</p>
            </div>                                                  
        </div>`
        this.stage.element.appendChild(gameInfo);
        this.imgWidth = gameInfo.querySelector("#game_img").clientWidth
        gameInfo.querySelector("#canvas").setAttribute("width",`${this.imgWidth}`)
        gameInfo.querySelector("#canvas").setAttribute("height",`${this.imgWidth}`)

        this.canvas = new Canvas({
            canvas: gameInfo.querySelector("#canvas"),
            img: gameInfo.querySelector("#game_img"),
            width: this.imgWidth
        })
        this.canvas.drawFull();

        gameInfo.querySelector("#game_start").addEventListener("click",()=>{
            gameInfo.querySelector("#game_img").setAttribute("style","opacity:0;")
            this.gameStart(gameInfo);
        })
        gameInfo.querySelector("#game_reset").addEventListener("click",()=>{        
            this.gameReset();
        })
        gameInfo.querySelector("#game_close").addEventListener("click",()=>{        
            gameInfo.remove();
        })
        gameInfo.querySelector("#game_help").addEventListener("click",()=>{
            if(!this.pause){
                this.pause = true;
                // gameInfo.querySelector("#game_img").setAttribute("style","display:block;")
                this.canvas.drawFull();
            }else{
                this.pause = false;
                this.canvas.draw(this.data2)
                // gameInfo.querySelector("#game_img").setAttribute("style","display:none;")
            }       
        })
        gameInfo.querySelector("canvas").addEventListener("click",(e)=>{
            let cardHeaderHeight = gameInfo.querySelector(".card-header").offsetHeight;           
            if(!this.clear && !this.pause){
                this.movePice(e.layerX,(e.layerY - cardHeaderHeight))
            }
        })
        
        
    }
    gameClear(){
        // mengecek game clear atau tidak 
        let i = 0;
        let match = 0;
        Object.keys(this.data2).forEach(dt=>{
            if(dt == `${this.data2[dt][0]},${this.data2[dt][1]}` && this.data2["3,3"] == "blank"){
                match += 1;
            }
            i++;
        })
        if(match === 15){
            this.clear = true;
            this.canvas.drawFull();
            setTimeout(()=>{
                alert("game Clear");
            },2000)
        }
        console.log(match)
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
        let string = `${score.getUTCHours()}:${score.getMinutes()}:${score.getSeconds()}`;
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
   async movePice(x,y){
        let X = Math.floor(x/(this.imgWidth/4));
        let Y = Math.floor(y/(this.imgWidth/4));

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
    saveScore(){
        // menyimpan progres game 
    }
    gameData(array){
        let dataImgGame = {};
        let index = 0;
        for (let i = array.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [array[i], array[j]] = [array[j], array[i]]; 
          } 
        for(let x = 0; x < 4; x++){
            for(let y = 0 ; y < 4; y++){
                if(array[index] == "3,3"){
                    dataImgGame[`${x},${y}`] = "blank";
                }else{
                    dataImgGame[`${x},${y}`] = array[index];
                }

                index++;
            }
        }
        return dataImgGame; 
    }
    gameLoop(){
        // game loop 
    }
}