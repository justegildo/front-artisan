import { Navigate } from "react-router-dom";
import { accountService } from "../_services/account.service";
import PropTypes from "prop-types";

const AuthGuard = ({ children }) => {
    let token = accountService.isLogged();
    
    
    if(token === null){
        return <Navigate to='/auth/login'/>
    } 

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthGuard;