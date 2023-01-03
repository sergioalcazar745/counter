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

    deletesala(id){
        return new Promise(function(resolve){
            var request = Global.url + "api/Salas/" + id;

            axios.delete(request).then(() => {
                resolve();
            });
        });
    }

    postsala(nombre){
        return new Promise(function(resolve){
            var request = Global.url + "api/salas/createsala/" + nombre;

            axios.post(request).then(() => {
                resolve();
            });
        });
    }

    updatesala(id, nombre){
        return new Promise(function(resolve){
            var request = Global.url + "api/salas/updatesala/" + id + "/" + nombre;
            console.log(request)

            axios.put(request).then(() => {
                resolve();
            });
        });
    }

}