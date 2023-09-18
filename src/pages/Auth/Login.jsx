/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import '../../assets/login.css'
import { accountService } from '../../_services/account.service';
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login2 = () => {

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
                //toast.success("Connection successful");
                var decoded = jwt_decode(token);
                accountService.saveUilisateur(JSON.stringify(decoded, null, 2))
                navigate('/admin')
                
                
                //console.log(decoded);

            })
            .catch(err => {
                console.error(err)
                toast.error(err.response.data);
                setIsLoading(false);
                /* setTimeout(() => {
                    setIsLoading(false);
                  }, 3000); */
            })
    }
    
    return (
        <div>
            <main>
                <div className="container">

                    <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                    <div className="d-flex justify-content-center py-4">
                                        <a href="index.html" className="logo d-flex align-items-center w-auto">
                                            <img src="/src/assets/img/logo.png" alt="" />
                                            <span className="d-none d-lg-block">ARTI-COUT</span>
                                        </a>
                                    </div>

                                    <div className="card mb-3">

                                        <div className="card-body">

                                            <div className="pt-4 pb-2">
                                                <h5 className="card-title text-center pb-0 fs-4">CONNEXION</h5>
                                                <p className="text-center small">Entrer  vos informations de connexion</p>
                                            </div>

                                            <form className="row g-3 needs-validation" onSubmit={onSubmit} > 

                                                <div className="col-12">
                                                    <label htmlFor="yourUsername" className="form-label">Nom d'utilisateur</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                        <input type="text" name="username" className="form-control" id="yourUsername" onChange={onChange} required />
                                                        <div className="invalid-feedback">Nom d\utilisateur requis.</div>
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <label htmlFor="yourPassword" className="form-label">Mot de passe</label>
                                                    <input type="password" name="password" className="form-control" id="yourPassword" onChange={onChange} required />
                                                    <div className="invalid-feedback">Mot de passe requis!</div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                        <label className="form-check-label" htmlFor="rememberMe">Se souvenir de moi</label>
                                                    </div>
                                                </div>
                                                {isLoading ? (
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" disabled>
                                                        En cours ... 
                                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>            
                                                        </button>
                                                    </div>
                                                    
                                                ) : (
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" type="submit" /*onClick={onSubmit}*/ >Se connecter</button>
                                                    </div>
                                                )}
                                                <div className="">
                                                    <p className="text-center small"><Link to="">Mot de passe oublié ? </Link> <Link to='/auth/register'> Créer un compte</Link> </p>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    {/* <div className="credits">
                                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                                    </div> */}

                                </div>
                            </div>
                        </div>

                    </section>

                </div>
            </main>
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

            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

        </div>
    );
};

export default Login2;