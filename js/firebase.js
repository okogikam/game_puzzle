import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
   
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
