import Global from "./../Global";
import axios from "axios";

export default class LoginService {

    getToken(data){
        return new Promise(function(resolve) {
            var request = Global.url + "Auth/Login";

            axios.post(request,data).then(response => {
                resolve(response.data)
            })
            .catch(error=>{
                
                throw new(error)
            });
        });
    }
}