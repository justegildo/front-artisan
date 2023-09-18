import { useState } from 'react';
import '../../assets/login.css'
import { accountService } from '../../_services/account.service';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false);

    const [credentials, setCredentials] = useState({
        username:'',
        password:''
    })

    const onChange =(e) =>{
        setCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        setIsLoading(true);
        console.log(credentials);
        accountService.login(credentials)
            .then(res => {
                
                console.log(res.data)
                accountService.saveToken(res.data.token)
                var token = res.data.token;
                toast.success("Connection successful");
                var decoded = jwt_decode(token);
                accountService.saveUilisateur(JSON.stringify(decoded, null, 2))
                navigate('/admin')
                
                
                //console.log(decoded);

            })
            .catch(err => {
                console.error(err)
                toast.error(err.response.data);
                setIsLoading(false);
            })
    }
    
    return (
        <div>
            <form className="box">
                <h1>Login form</h1>

                <input type="text" name='username' placeholder="Nom d'utilisateur" onChange={onChange} required />

                <input type="password" name='password' placeholder="Mot de passe" onChange={onChange} required />

                {/* <input type="button" value="Se connecter" onClick={onSubmit} />

                <button className="btn btn-primary">
                    <span className="spinner-border spinner-border-sm"></span>
                </button> */}
                {isLoading ? ( 
                    <button className="btn btn-primary" disabled>
                        En cours ...
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        
                    </button>
                ) : (
                    <button type="button" onClick={onSubmit} >
                        Se connecter
                    </button>
                    
                )}

                <a href="#">Mot de passe oublié ? </a>
                <a href="#">Créer un compte</a>


            </form>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
            />
        </div>
    );
};

export default Login;