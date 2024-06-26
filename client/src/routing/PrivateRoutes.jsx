import { Navigate } from "react-router-dom";


export const PrivateRoutes = ({children})=>{
    const getTokenFromSesstion = JSON.parse(sessionStorage.getItem("user"))
    // console.log(getTokenFromSesstion)
    return getTokenFromSesstion?.token !== undefined ? children : (<Navigate to={'/login'} replace={true}/>)

}