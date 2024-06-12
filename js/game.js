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
    }

    async loadGeme(){        
        // menyiapkan game 
        const gameInfo = document.createElement("div");
        gameInfo.setAttribute("id","gameBoard");
        gameInfo.innerHTML = 
        `<div class="card">
            <div class="row">
                <div class="col-md-6">
                    <img id="game_img" class="card-img" src="${this.stage.url}" alt="">
                    <canvas id="canvas" width="400" height="400"></canvas>
                </div>
                <div class="col-md-6">
                    <h3>${this.stage.stage}</h3>
                    <button id="game_start" class="btn btn-sm">Start</button>
                    <button id="game_clear" class="btn btn-sm">Clear</button>
                </div>
            </div>            
        </div>`
        this.stage.element.appendChild(gameInfo);
        this.imgWidth = gameInfo.querySelector("#game_img").clientWidth
        this.canvas = new Canvas({
            canvas: gameInfo.querySelector("#canvas"),
            img: gameInfo.querySelector("#game_img"),
            width: this.imgWidth
        })

        gameInfo.querySelector("#game_start").addEventListener("click",()=>{
            gameInfo.querySelector("#game_img").setAttribute("style","opacity:0;")
            gameInfo.querySelector("#canvas").setAttribute("width",`${this.imgWidth}`)
            gameInfo.querySelector("#canvas").setAttribute("height",`${this.imgWidth}`)

            this.gameStart();
        })
        gameInfo.querySelector("#game_clear").addEventListener("click",()=>{         

            this.canvas.clear();
        })
        gameInfo.querySelector("#canvas").addEventListener("click",(e)=>{
            // console.log(e)
            this.movePice(e.layerX,e.layerY)
            // this.movePice({e.x,e.y});
        })
        
        
    }
    gameClear(){
        // mengecek game clear atau tidak 
        let i = 0;
        let match = 0;
        Object.keys(this.data2).forEach(dt=>{
            if(dt == `${this.data2[dt][0]},${this.data2[dt][1]}` && this.data2["3,3"] == "blank"){
                match += 1;
                // console.log(dt)
            }
            // console.log(this.data1[i])
            i++;
        })
        if(match === 15){
            this.clear = true;
            return "game Clear";
        }
        console.log(match)
    }
    gameScore(){
        // mencatat skor game 
    }
    gameStart(){
        this.data2 = this.gameData(this.data1);
        console.log(this.data2)
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