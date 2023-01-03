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

    postTemporizador(temporizador){
        return new Promise(function(resolve) {
            var request = Global.url + "api/timers";

            axios.post(request, temporizador).then(response => {
                resolve(response.data)
            });
        });
    }

    putTemporizador(temporizador){
        return new Promise(function(resolve) {
            var request = Global.url + "api/timers";

            axios.post(request, temporizador).then(response => {
                resolve(response.data)
            });
        });
    }

    deleteTemporizador(id){
        return new Promise(function(resolve) {
            var request = Global.url + "api/timers/" + id;

            axios.delete(request).then(response => {
                resolve(response.data)
            });
        });
    }
}