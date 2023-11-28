
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useProductContext } from "../context/productContext";
import { useUserAuth } from "../context/UserAuthContext";

import CartItem from "../components/Cart/CartItem";

import Loader from "../components/Loader/Loader";


import firstStyles from "../Styles/home.module.css";
import secondStyles from "../Styles/cart.module.css";


import { toast } from "react-toastify";


export function Cart(){

    const [isLoading,setLoading]=useState(true);

    const { cart, name, total, clearCart, purchaseAll, itemInCart }=useProductContext();
    
    const { user } = useUserAuth();

    const navigate=useNavigate();

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },300);            
    },[]);

    function handlePurchase(){

        if(itemInCart === 0){
            toast.error("Nothing to purchase in Cart!!");    
            return;
        }

        purchaseAll();
        navigate("/myorder");
    }

    function clearingCart(){
        clearCart(0);
    }
    


    return(
        <>
        {isLoading?<Loader />:
            <div className={secondStyles.mainContainer}>
                <div className={secondStyles.header}>

                    <div className={secondStyles.userInfo}>
                        <h1>Hey {name}, <small>Your Cart has</small></h1>
                    </div>

                    <div className={secondStyles.cartDetail}>
                        
                        <div>
                            Item: {itemInCart}
                            <br />

                            <button className={secondStyles.removeAll}
                                    onClick={clearingCart}>
                                Remove All
                            </button>
                        </div>


                        <div>
                            Total Amount: ₹{total}
                            <br />
                            <button className={secondStyles.purchaseAll}
                                    onClick={handlePurchase}>
                                Purchase All
                            </button>
                        </div>

                    </div>
                </div>

                <div className={firstStyles.itemContainer}>
                    {cart.length === 0 ?
                                    <h1>Nothing in Your Cart !!!</h1>
                                    :cart.map((product,i) => <CartItem key={i}
                                                        product={product}/>)}
                </div>
            </div>
        }
        </>
    );
}