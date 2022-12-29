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

}