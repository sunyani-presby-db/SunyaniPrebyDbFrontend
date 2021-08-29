import React from 'react'
import { Redirect, Route } from 'react-router'
import { fetchIsAuthenticated } from '../utils/local_data/store_user_info'

const ProtectedRoute = ({compoonent:Component,...rest}) => {

    return (
        <Route 
        {...rest}
        render = {props=>{
            if (fetchIsAuthenticated()){
                return <Component {...props} />
            }else{
                return <Redirect to ={{
                    pathname : "/login",
                    state:{
                        next:props.location
                    }
                }}/>
            }
        }}
        />
            
        
    )
}

export default ProtectedRoute
