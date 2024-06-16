class Data{
    constructor(conf){
        // this.id = conf.id? conf.id : "";
    }
    async loadDataUser(id){
        let dtUser = await fetch("./data/userData.json");
        dtUser = await dtUser.json();
        if(localStorage.getItem("dataUserGamePuzzle")){
            let dataLocal = JSON.parse(localStorage.getItem("dataUserGamePuzzle"));
            Object.values(dataLocal).forEach(dt=>{
                dtUser.push(dt)
            })
        }
        if(id != ""){
            if(localStorage.getItem("gamePuzzleProgres")){
                dtUser[id].stageClear = localStorage.getItem("gamePuzzleProgres")
            }
            return dtUser[id];  
        }
        return dtUser;
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
    saveData(){
        // menyimpan data di local 
    }
    clearData(){
        // menghapus data dilocal 
    }
    updateData(){
        // mengecek perbedaan data local dengan internet 
    }
}