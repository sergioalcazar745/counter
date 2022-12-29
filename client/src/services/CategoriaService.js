import Global from "./../Global";
import axios from "axios";

export default class CategoriaService{

    getAllCategorias(){
        return new Promise(function(resolve) {
            var request = Global.url + "api/categoriastimer";

            axios.get(request).then(response => {
                resolve(response.data)
            });
        });
    }
}