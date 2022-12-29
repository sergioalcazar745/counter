import Global from "./../Global";
import axios from "axios";

export default class EmpresaService{

    getAllEmpresas(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/empresas";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

    deleteEmpresa(id){
        return new Promise(function(resolve){
            var request = Global.url + "api/empresas/" + id;

            axios.delete(request).then(() => {
                resolve();
            });
        });
    }

    postEmpresa(nombre){
        return new Promise(function(resolve){
            var request = Global.url + "api/empresas/createempresa/" + nombre;

            axios.post(request).then(() => {
                resolve();
            });
        });
    }

    updateEmpresa(id, nombre){
        return new Promise(function(resolve){
            var request = Global.url + "api/empresas/updateempresa/" + id + "/" + nombre;
            console.log(request)

            axios.put(request).then(() => {
                resolve();
            });
        });
    }

}