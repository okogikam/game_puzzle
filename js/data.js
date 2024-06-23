class Data{
    constructor(conf){
        // this.id = conf.id? conf.id : "";
    }
    async loadDataUser(id){
        let dtUser = await fetch("https://habaranime.info/api/game_puzzle/");
        this.dtUser = await dtUser.json();        
        
        // if(id == 0){
        //     return this.dtUser[0];
        // }
        if(id !== ""){
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
        this.saveDataOnline(conf.username,conf.password,conf.email);

        localStorage.setItem("dataUserGamePuzzle",JSON.stringify(newUser));
    }
    async saveDataOnline(username,pass,email){
        let formData = new FormData();
            formData.append('userName', `${username}`);
            formData.append('email', `${email}`);
            formData.append('password', `${pass}`);
            try{
                const respons = await fetch("https://habaranime.info/api/game_puzzle/?api=newuser",{
                    method: "POST",
                    body: formData
                })
               let result = await respons.json();
                console.log(result);
                
            } catch(e){
                // status.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i> Gagal disimpan: ${e}`;
                console.error(e)
            }
        
    }
    async saveProgresOnline(conf){
        let formData = new FormData();
            formData.append('userName', `${conf.username}`);
            formData.append('progres', `${conf.progres}`);
            formData.append('score', conf.score);
            try{
                const respons = await fetch("https://habaranime.info/api/game_puzzle/?api=saveprogres",{
                    method: "POST",
                    body: formData
                })
                let result = await respons.json();
                console.log(result);
                
            } catch(e){
                // status.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i> Gagal disimpan: ${e}`;
                console.error(e)
            }
        // console.log(formData);
    }
    clearData(){
        // menghapus data dilocal 
    }
    updateData(){
        // mengecek perbedaan data local dengan internet 
    }
}