class Share{
    constructor(conf){
        this.element = conf.element;
        this.main = conf.main;
        this.div = document.createElement("div");
        this.link = "https://okogikam.github.io/game_puzzle/";
        this.title = "Anime Slide Quest";
    }
    copyLink(){
        navigator.clipboard.writeText(this.link);
        window.alert("Link Copied");
    }
    shareWa(){
        let a = document.createElement("a");
        a.href = `https://api.whatsapp.com/send?text=${this.title} ${this.link}`;
        a.click();
    }
    shareFb(){
        let a = document.createElement("a");
        a.href = `https://www.facebook.com/sharer/sharer.php?u=${this.link}&title=${this.title}`;
        a.click();
    }
    shareTele(){
        let a = document.createElement("a");
        a.href = `https://t.me/share/url?url=${this.link}&text=${this.title}`;
        a.click();
    }
    makeElement(){
        this.div.setAttribute("id","share-dialog");
        this.div.innerHTML = `
        <div class="card">
         <div class="card-header">
            <button id="share_close" class="btn">
                <i class="fa-solid fa-reply"></i>
            </button>
         </div>
         <div class="card-body">
           <p>https://okogikam.github.io/game_puzzle/</p>
         </div>
         <div class="card-footer">
           <button class="btn btn-sm btn-copy" class="btn"><i class="fa-solid fa-code"></i></button>
           <button class="btn btn-sm btn-wa" class="btn"><i class="fa-brands fa-square-whatsapp"></i></button>
           <button class="btn btn-sm btn-fb" class="btn"><i class="fa-brands fa-square-facebook"></i></i></button>
           <button class="btn btn-sm btn-tele" class="btn"><i class="fa-brands fa-telegram"></i></i></button>
         </div>
        </div>`

        this.element.appendChild(this.div)
        this.div.querySelector("#share_close").addEventListener("click",()=>{
            this.div.remove();
        })
        this.div.querySelector(".btn-copy").addEventListener("click",()=>{
            this.copyLink();
        })
        this.div.querySelector(".btn-wa").addEventListener("click",()=>{
            this.shareWa();
        })
        this.div.querySelector(".btn-fb").addEventListener("click",()=>{
            this.shareFb();
        })
        this.div.querySelector(".btn-tele").addEventListener("click",()=>{
            this.shareTele();
        })
    }
    init(){
        this.makeElement();
    }
}