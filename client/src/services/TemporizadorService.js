import Global from "./../Global";
import axios from "axios";

export default class TemporizadorService{

    getAllTemporizadores(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/timers";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }
}