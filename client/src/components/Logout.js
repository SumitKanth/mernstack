import React, { useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(UserContext);

    // Promises
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/logout', {      // Fetch mtlb ye backend pr jaata h auth.js m '/logout' m or usme jo hota wo krta h fhir agr wo ho 
            // gya to promises ka then wrna catch pr jaata h or is wale fetch m ye backend pr jaa rha h cookies delete krke yaha 
            // promises ke then wala task krrha h, isi ko bolte h frontend se backend pr jaana with proxy kioki backend ka server 5000  
            // pr chl rha h or frontend ka 3000 pr 
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"                
            },
            credentials:'include'
        }).then((res) => {
            dispatch({type:"USER", payload:false});
            navigate('/login');
            if(res.status != 200){
                throw new Error
            }
        }).catch((err) => {
            console.log(err);
        })
    })

    return (
        <>
        <h1>Hello, This is an logout page</h1>
        </>
    )
}

export default Logout