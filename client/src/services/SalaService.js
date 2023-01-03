import Global from "./../Global";
import axios from "axios";

export default class EmpresaService{

    getSalas(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/Salas";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

    deleteSala(id){
        return new Promise(function(resolve){
            var request = Global.url + "api/Salas/" + id;

            axios.delete(request).then(() => {
                resolve();
            });
        });
    }

}