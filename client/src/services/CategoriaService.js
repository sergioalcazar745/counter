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

    deleteCategoria(id){
        return new Promise(function(resolve){
            var request = Global.url + "api/categoriastimer/" + id;

            axios.delete(request).then(() => {
                resolve();
            });
        });
    }

    postCategoria(categoria){
        return new Promise(function(resolve){
            var request = Global.url + "api/categoriastimer";

            axios.post(request, {idCategoria: categoria.idCategoria, categoria: categoria.categoria, duracion: categoria.duracion}).then(() => {
                resolve();
            });
        });
    }

    updateCategoria(categoria){
        return new Promise(function(resolve){
            var request = Global.url + "api/categoriastimer";

            axios.put(request, {idCategoria: categoria.idCategoria, categoria: categoria.categoria, duracion: categoria.duracion}).then(() => {
                resolve();
            });
        });
    }
}