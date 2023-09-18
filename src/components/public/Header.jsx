import { Link } from 'react-router-dom';
import '../../assets/headerPublic.css'

const Header = () => {
    return (
        <div>
            <div className="navbar">
            <div>
                <a href="index.html">ART-COU</a>
            </div>
            <nav>
                <ul>
                    <li><Link to="/home" >Tableau de bord</Link> </li>
                    <li> <Link to="/about" >A propos</Link> </li>
                    <li> <Link to="/contact" >Contact</Link> </li>
                    <li>
                        <Link to="/auth/login" >
                        <button className="loginbtn">
                            Se connecter
                        </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
        </div>
    );
};

export default Header;