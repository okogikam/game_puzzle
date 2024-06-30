import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyDEBZtrCfyN_7JSKgvi7WDijaW0gN3mBPI",
authDomain: "gamepuzzle-428000.firebaseapp.com",
projectId: "gamepuzzle-428000",
storageBucket: "gamepuzzle-428000.appspot.com",
messagingSenderId: "295063846449",
appId: "1:295063846449:web:c19e53e1de1c8146d01f10",
measurementId: "G-NDLTYR0FS3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.fb ={
    login: ()=>{
        signInWithPopup(auth, provider)
        .then((result) => {
            let credential = GoogleAuthProvider.credentialFromResult(result);
            let token = credential.accessToken;
            let user = result.user;
            console.log(user['displayName']);
            console.log(user['email']);
            gameMain.data.saveData({
                username: user['displayName'],
                password: user['email'],
                email: user['email']
            })
            gameMain.init();
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        })
    }
}