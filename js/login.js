class Login{
    constructor(config){
        this.main = config.main;
        this.div = document.createElement("div");
        this.loginStatus =  false
    }
    loginPage(){    
        // console.log(this.main) 
        this.div.setAttribute("id","loginPage");
        this.div.innerHTML = `
        <div class="card-logo">
            <img class="logo" src="./img/icon_6.png" alt="">
            <span>Anime Slide Quest</span>
        </div>
        <div class="form"></div>`;
        // this.div.appendChild(webLogo);
        if(localStorage.getItem("dataUserGamePuzzle")){
            let dtuser = JSON.parse(localStorage.getItem("dataUserGamePuzzle"));
            this.welcomePage({
                div: this.div.querySelector(".form"),
                dtuser: dtuser
            })
            // console.log(dtuser.userName)
        }else{
            this.loginUserPage(this.div.querySelector(".form"));
        }

        this.main.element.appendChild(this.div);
    }
    welcomePage(conf){
        conf.div.innerHTML = `
        <div class="welcome-page">
                 <button id="login" class="btn btn-sm btn-primary">Welcome Back ${conf.dtuser.userName}</button>
                 <button id="newUser" class="btn btn-sm btn-secondary">new User</button>
        </div>
        <div class="error-ms"></div>`
        conf.div.querySelector("#login").addEventListener("click",()=>{
            this.main.loadingIn();
            this.loginUser({
                username: conf.dtuser.userName,
                password: conf.dtuser.password
            })
        })
        conf.div.querySelector("#newUser").addEventListener("click",()=>{
            this.main.loadingIn();
            this.loginUserPage(this.div.querySelector(".form"));
            this.main.loadingOut();
        })
    }
    loginUserPage(div){
        div.innerHTML = `
        <div class="card">
            <div class="card-body">
                 <input id="username" class="form-control m-1" placeholder="Username">
                 <input id="password" class="form-control m-1" placeholder="Pasword">
            </div>
            <div class="card-footer justify">
                <button class="btn btn-secondary btn-signup">Signup</button>
                <button class="btn btn-primary btn-login">Login</button>
            </div>
        </div>
        <div class="error-ms"></div>
        <div id="firebaseui-auth-container">
           <h4>Login with: 
           <button class="btn btn-sm" id="btnGoogle"><i class="fa-brands fa-google"></i></button>           
           </h4>
        </div>
        `
        div.querySelector(".btn-login").addEventListener("click",()=>{
            // console.log("clixk")
            this.main.loadingIn();
            this.username = div.querySelector("#username").value;
            this.password = div.querySelector("#password").value;
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
        div.querySelector("#btnGoogle").addEventListener("click",()=>{
            fb.login()
        })   
        div.querySelector(".btn-signup").addEventListener("click",()=>{
            this.main.loadingIn();
            this.newUser(this.div.querySelector(".form"));
            this.main.loadingOut();
        })
    }
    newUser(div){
        div.innerHTML = `
        <div class="card">
            <div class="card-body">
                 <input id="username" class="form-control m-1" placeholder="Username">
                 <input id="email" class="form-control m-1" placeholder="Email">
                 <input id="password" class="form-control m-1" placeholder="Pasword">
            </div>
            <div class="card-footer justify">
                <button class="btn btn-secondary btn-signup">Signup</button>
            </div>
        </div>
        <div class="error-ms"></div>
        `  
        div.querySelector(".btn-signup").addEventListener("click",()=>{
            this.main.loadingIn();
            this.username = div.querySelector("#username").value;
            this.password = div.querySelector("#password").value;
            this.email = div.querySelector("#email").value;
            if(this.cekUser(this.username)){
                this.errorMs("Username sudah terdaftar");
                return;
            }
            this.main.data.saveData({
                username: this.username,
                password: this.password,
                email: this.email
            })
            this.singupUser();
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
                this.main.data.saveData(values)
            }
        })
    }
    singupUser(){
        this.main.init();
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