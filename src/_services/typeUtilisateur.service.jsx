import Axios from "./caller.service"

let getAll = () =>{
    return Axios.get('/api/type-user')
}


export const typeUtilisateurService = {
    getAll,
}