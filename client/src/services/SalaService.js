import Global from "./../Global";
import axios from "axios";

export default class EmpresaService{

    getSalas(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/empresas";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }

}