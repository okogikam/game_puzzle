class Login{
    constructor(config){
        this.main = config.main;
        this.div = document.createElement("div");
        this.loginStatus =  false
    }
    loginPage(){     
        this.div.setAttribute("id","loginPage");
        this.div.innerHTML = `
        <div class="card-logo">
            <img class="logo" src="./img/default.jpeg" alt="">
            <span>Game Slide Puzzle</span>
        </div>`;

        this.newUser();
        this.main.element.appendChild(this.div);
    }
    newUser(div){
        this.div.innerHTML += `
        <div class="card">
            <div class="card-body">
                 <input id="username" class="form-control" placeholder="Username">
                 <input id="password" class="form-control" placeholder="Pasword">
            </div>
            <div class="card-footer justify">
                <button class="btn btn-secondary btn-signup">Signup</button>
                <button class="btn btn-primary btn-login">Login</button>
            </div>
        </div>
        <div class="error-ms"></div>
        `
        
        this.div.querySelector(".btn-login").addEventListener("click",()=>{
            console.log("clixk")
            this.username = this.div.querySelector("#username").value;
            this.password = this.div.querySelector("#password").value;
            if(!this.cekUser(this.username)){
                this.errorMs("Username belum terdaftar");
                return;
            }
            this.loginUser({
                username: this.username,
                password: this.password
            })
            if(!this.loginStatus){
                this.errorMs("Username atau Password salah")
            }
        })       
    }
    cekUser(user){
        let userExsis = false;
        Object.values(this.main.dataUser).forEach((values)=>{
            if(values.userName === user){
                userExsis = true;
            }
        })

        return userExsis;
    }
    loginUser(id){
        Object.values(this.main.dataUser).forEach((values,key)=>{
            if(values.userName === id.username && values.password === id.password){
                this.loginStatus = true;
                this.userLogin = key;
                this.main.gameLoop();
            }
        })
    }
    errorMs(pesan){
        this.div.querySelector(".error-ms").innerHTML = "";
        this.div.querySelector(".error-ms").innerHTML = `
        <div class="error-ms">
            <p>*${pesan}</p>
        </div>
        `
    };
}