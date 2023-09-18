import axios from 'axios'
import { accountService} from './account.service'


const Axios = axios.create({
    baseURL: 'http://localhost:8001',
    timeout: 1000
  });

/***
 * Intercepteur
 */

axios.interceptors.request.use(request =>{

    if(accountService.isLogged()){
        request.headers.Authorization = 'Bearer ' + accountService.isLogged()
    }
    return request
})


axios.interceptors.response.use(function (response) {

    return response;

  }, function (error) {

     if(error.response.status === 401){

        accountService.logout()
        window.location = '/auth/login'

    } else{
        return Promise.reject(error)
    }
  });

export default Axios;