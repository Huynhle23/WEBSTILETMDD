import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { config } from "../utils/axiosconfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptycart } from "../features/users/userSlice";
const style = {"layout":"vertical"};

const ButtonWrapper = ({ currency,showSpinner,amount,payload}) => {
    const [{ isPending,options },dispatch] = usePayPalScriptReducer();
    const navigate = useNavigate()
    const d=useDispatch()
    useEffect(()=>{
        dispatch({
            type:"resetOptions",
            value:{
                ...options,currency:currency
            }
        })
    },[currency,showSpinner])
    return (
        <>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style,currency,amount]}
                fundingSource={undefined}
                createOrder={(data,actions)=> actions.order.create({
                    purchase_units : [
                        { amount : { currency_code : currency , value : amount }}
                    ]
                })
            }
                onApprove={(data,actions)=>{
                    actions.order.capture().then(async(res)=>{
                        const orderUser = axios.post(`${base_url}user/cart/create-order`,payload,config)
                        if(res.status ==="COMPLETED"){
                            d(emptycart())
                            navigate('/checkoutsuccess')
                            window.location.reload()
                        }
                    })
                }}
            />
        </>
    );
}

export default function Paypal({amount,payload}) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}