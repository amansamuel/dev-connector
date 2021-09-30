import PropsType from 'prop-types';
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const  PrivateRoute =({component: Component ,auth, ...rest}) =>{
    return (
        <Route 
        {...rest}
        render ={props =>
        auth.isAuthenticated ===true ? (
            <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )
        }
        
        />
    )
}
PrivateRoute.prototype={
    auth:PropsType.object.isRequired
}
const mapStateToProps =state=>({
    auth:state.auth
})
export default connect(mapStateToProps)(PrivateRoute);
