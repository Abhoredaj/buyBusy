import { createContext, useContext, useEffect, useState } from "react";

import {db} from "../firebaseInit";
import { getDoc, updateDoc, doc, arrayUnion, onSnapshot, arrayRemove } from "firebase/firestore";

import { data } from "../Assets/data";

import { useUserAuth } from "./UserAuthContext";
import { Navigate } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

export const productContext = createContext();

export function useProductContext(){
    const value=useContext(productContext);
    return value;
}

export function ProductContext({children}){
    
    const { user } = useUserAuth();
    
    const [itemInCart,setItemInCart]=useState(0);

    const [name,setName]=useState("");
   
    const [cart,setCart]=useState([]);
    
    const [myorders,setMyOrders]=useState([]);
   
    const [total,setTotal]=useState(0);

    const [isAdding, setIsAdding] = useState(false);

    function getDate(){
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return(`${year}-${month}-${day}`);
    }

    useEffect(()=>{
        if(!user){
            console.log("hey");
        }else if(Object.keys(user).length !== 0){
            const unsub = onSnapshot(doc(db, "users",user.uid), (doc) => {
                if (!doc.data()){
                    console.log("buy")
                } else {
                    console.log(doc.data().uid);
                    const cartData = doc.data().cart;
                    setCart(cartData);
                    setName(doc.data().Name);
                    setMyOrders(doc.data().orders);
                    setItemInCart(cartData.length);
                    let sum = 0;
                    cartData.map((item) => (sum += item.price));
                    setTotal(sum);
                }
                
            });
        }
    },[user]);    
    
    async function increaseQuant(product){
        const index=cart.findIndex((item) => item.name === product.name);
        cart[index].quantity++; 
        setCart(cart);

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: cart
        });
        setItemInCart(itemInCart + 1);
        setTotal(Number(total + cart[index].price));
    }


    async function decreaseQuant(product){
        const index=cart.findIndex((item) => item.name === product.name);
        setTotal(Number(total - cart[index].price));
        
        if(cart[index].quantity > 1){
            cart[index].quantity--;
        }
        else{
            cart.splice(index,1);
        }

        setCart(cart);
        setItemInCart(itemInCart-1 );

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: cart
        });
    }


    async function addToCart(product){

        if(!user){
            toast.error("Please first Login !!!");
            return <Navigate to="/" />;
        }

        setIsAdding(true);

        const index = cart.findIndex((item) => item.name === product.name);
        if (index !== -1) {
            // if product already in cart then increase quantity
            increaseQuant(cart[index]);
            toast.success("Product Quantity Increased!!");
            setIsAdding(false); // Set loading state back to false
            return;
        }

        // add product to the cart of loggedIn user
        const userRef = doc(db, "users", user.uid);
        try {
            await updateDoc(userRef, {
                cart: arrayUnion({ quantity: 1, ...product })
            });
            // increase item count and total amount
            setTotal(Number(total + product.price));
            setItemInCart(itemInCart + 1);
            toast.success("Added to your Cart!!");
        } catch (error) {
            console.error("Error adding item to cart:", error.message);
            toast.error(`Error adding item to cart: ${error.message}`);
        } finally {
            setIsAdding(false); // Set loading state back to false, whether successful or not
        }
    }

    async function removeFromCart(product){
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: arrayRemove(product)
        });
        setTotal(Number(total - (product.quantity * product.price)));
        setItemInCart(itemInCart - product.quantity);
        toast.success("Removed from Cart!!")
    }


    async function clearCart(flag=0){
        if(itemInCart === 0){
            toast.error("Nothing to remove in Cart!!");    
            return;
        }

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            cart: []
        });

        setTotal(0);
        setItemInCart(0);
        if(flag === 0){
            toast.success("Empty Cart!!");
        } else if(flag == 1){
            toast.success("All purchased!!");
        }
        
    }


    async function purchaseAll(){
        const currentDate=getDate();

        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
            orders: arrayUnion({date:currentDate,list:cart,amount:total})
        });

        clearCart(1);
    }


    return(
        <productContext.Provider  value={{data,
                                    addToCart,
                                    cart,
                                    total,
                                    setTotal,
                                    removeFromCart,
                                    clearCart,
                                    purchaseAll,
                                    myorders,
                                    increaseQuant,
                                    decreaseQuant,
                                    name,
                                    itemInCart,
                                    isAdding, 
                                    setIsAdding}}>

            {children}
        </productContext.Provider>
    );
}