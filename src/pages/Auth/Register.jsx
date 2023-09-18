import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { typeUtilisateurService } from "../../_services/typeUtilisateur.service";
import { accountService } from "../../_services/account.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Register = () => {

    const navigate = useNavigate()
    const [getTypes, setGetTypes] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        typeUtilisateurService.getAll()
            .then(res => {
                console.log(res.data);
                setGetTypes(res.data)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    //console.log(getTypes);

    const [data, setData] = useState({
        nom: '', 
        prenoms: '', 
        sexe: '', 
        email: '', 
        telephone: '', 
        password: '', 
        type_utilisateur: '', 
        nom_atelier: '', 
        specialite: ''
    })   

    const onChange = (e) =>{
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const handleTypeUtilisateurChange = (e) => {
        const selectedTypeId = e.target.value;
        setData({
            ...data,
            type_utilisateur: selectedTypeId
        });
    }

    const handleSexeChange = (e) => {
        const selectedSexe = e.target.value;
        setData({
            ...data,
            sexe: selectedSexe
        });
    }

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(data);
        
        setIsLoading(true)
        /* setTimeout(() => {
            setIsLoading(false);
          }, 3000);  */
        accountService.register(data)
            .then(res => {
                console.log(res);
                toast.success("Compte crée avec succès !");
                setIsLoading(false)
                navigate("/auth/login")

            })
            .catch(err => {
                console.error(err);
                toast.error(err.response.data);
                setIsLoading(false)
            }) 
    }

    //console.log(data.type_utilisateur);

    return (
        <div>
            <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">

                                <div className="d-flex justify-content-center py-4">
                                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                                        <img src="/src/assets/img/logo.png" alt="" />
                                        <span className="d-none d-lg-block">ARTI-COUT</span>
                                    </a>
                                </div>

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Créer un compte</h5>
                                            <p className="text-center small">Entrer vos informations pour créer votre compte</p>
                                        </div>

                                        <form className="row g-3 needs-validation" onSubmit={onSubmit} /*novalidate*/ >
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="nom" className="form-label">Nom</label>
                                                    <input type="text" name="nom" className="form-control" id="nom" onChange={onChange} placeholder="" required />
                                                    <div className="invalid-feedback">Nom est requis !</div>
                                                </div>

                                                <div className="col">
                                                    <label htmlFor="prenoms" className="form-label">Prénom</label>
                                                    <input type="text" name="prenoms" className="form-control" id="prenoms" onChange={onChange} placeholder="" required />
                                                    <div className="invalid-feedback">Prénom est requis !</div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <label className="form-label">Sexe</label>
                                                    <div className="col">
                                                        <select className="form-select" defaultValue={'DEFAULT'} name="sexe" aria-label="Default select example" onChange={handleSexeChange}>
                                                            <option value="DEFAULT" disabled>Sélectionner</option>
                                                            <option value="MASCULIN">Masculin</option>
                                                            <option value="FEMININ">Féminin</option>
                                                            <option value="NON_DEFINI">Aucun</option> 
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <div className="input-group has-validation">
                                                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                        <input type="email" name="email" className="form-control" id="email" onChange={onChange} placeholder="" required />
                                                        <div className="invalid-feedback">Email requis </div>
                                                    </div>
                                                </div> 
                                                {/* <div className="col">
                                                    <div className="form-floating mb-3 mt-3">
                                                        <input type="text" className="form-control" id="email" placeholder="Enter email" name="email" />
                                                        <label htmlFor="email">Email</label>
                                                    </div>
                                                </div> */}
                                            </div>

                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="telephone" className="form-label">Téléphone</label>
                                                    <input type="text" name="telephone" className="form-control" id="telephone" onChange={onChange} placeholder="" required />
                                                    <div className="invalid-feedback">Téléphone est requis !</div>
                                                </div>

                                                <div className="col">
                                                    <label htmlFor="password" className="form-label">Mot de passe</label>
                                                    <input type="password" name="password" className="form-control" id="password" onChange={onChange} placeholder="" required />
                                                    <div className="invalid-feedback">Mot de passe requis !</div>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12">
                                                <label className="form-label">Type utilisateur</label>
                                                <div className="col-12">
                                                    <select className="form-select" defaultValue={'DEFAULT'} name="type_utilisateur" aria-label="Default select example" onChange={(e) => handleTypeUtilisateurChange(e)} >
                                                        <option value="DEFAULT" disabled>Sélectionner</option>
                                                        {getTypes.map((type) => (
                                                            <option key={type.id} value={type.id}>
                                                                {type.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {  data.type_utilisateur === '3' || data.type_utilisateur === '1' ? (null) : (
                                                <div className="row">
                                                    <div className="col">
                                                        <label htmlFor="nom_atelier" className="form-label">Nom atélier</label>
                                                        <input type="text" name="nom_atelier" className="form-control" id="nom_atelier" onChange={onChange} placeholder="" />
                                                        <div className="invalid-feedback">Nom atélier est requis !</div>
                                                    </div>

                                                    <div className="col">
                                                        <label htmlFor="specialite" className="form-label">Spécialité</label>
                                                        <input type="text" name="specialite" className="form-control" id="specialite" onChange={onChange} placeholder="" />
                                                        <div className="invalid-feedback">Spécialité est requise !</div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" name="terms" type="checkbox" value="" id="acceptTerms" required />
                                                    <label className="form-check-label" htmlFor="acceptTerms">Acceptez les <a href="#">termes de conditions</a></label>
                                                    <div className="invalid-feedback">You must agree before submitting.</div>
                                                </div>
                                            </div>

                                            {isLoading ? (
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" disabled>
                                                        En cours ... 
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>            
                                                        </button>
                                                    </div>
                                                    
                                                ) : (
                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100" type="submit">ENVOYER</button>
                                                    </div>
                                                )}
                                            
                                            <div className="col-12">
                                                <p className="text-center small">Avez-vous un compte ? <Link to="/auth/login">Se connecter</Link></p>
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

        </div>
    );
};

export default Register;