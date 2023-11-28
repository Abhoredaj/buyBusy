import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useProductContext } from "../context/productContext";

import OrderDetail from "../components/MyOrder/OrderDetail";
import Loader from "../components/Loader/Loader";

import styles from "../Styles/myorder.module.css";


export function MyOrder(){

    const {myorders}=useProductContext();

    const [isLoading,setLoading]=useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },300);            
    },[]);

    
    return(

        <>
        {isLoading?<Loader />:
            <div className={styles.mainContainer}>

                <h1 className={styles.orderHeading}>
                    My Orders
                </h1>

                {myorders.length === 0?
                    <>  
                        <h1>You haven't placed any order yet !!</h1>
                        <Link to="/home">!!! Start Shopping !!!</Link>
                    </>
                    :
                    <div className={styles.orderListContainer}>
                        {myorders.map((order,i) => <OrderDetail key={i} order={order} />)}
                    </div>
                }
            </div>
        }
        </>
    );
}