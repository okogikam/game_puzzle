class Data{
    constructor(conf){
        // this.id = conf.id? conf.id : "";
    }
    async loadDataUser(id){
        let dtUser = await fetch("./api/");
        this.dtUser = await dtUser.json();
        if(localStorage.getItem("dataUserGamePuzzle")){
            let dataLocal = JSON.parse(localStorage.getItem("dataUserGamePuzzle"));
            
            this.dtUser.push(dataLocal)
        }
        if(id != ""){
            return this.dtUser[id];  
        }
        return this.dtUser;
    }
    async loadDataStage(){
        let dtImg = await fetch("./data/imgData.json");
        dtImg = await dtImg.json();
        return dtImg;
    }
    cekData(){
        // mengecek ada atau tidak data di local 
    }
    downloadData(){
        // mengambil data di internet 
    }
    async saveData(conf){
        // menyimpan data di local
        if(conf.userId){
            localStorage.setItem("dataUserGamePuzzle",JSON.stringify(conf))
            return;
        }
        let newUser = {
           "userId": `#${conf.userId}`,
            "userType": "user",
            "userName": `${conf.username}`,
            "email": `${conf.email}`,
            "password": `${conf.password}`,
            "stageClear":[]
        }
        localStorage.setItem("dataUserGamePuzzle",JSON.stringify(newUser));
        let saveOnline = await fetch(`./api/?api=saveNewUser&username=${conf.username}&email=${conf.email}&password=${conf.password}`);
        console.log(conf.userId)
    }
    clearData(){
        // menghapus data dilocal 
    }
    updateData(){
        // mengecek perbedaan data local dengan internet 
    }
}