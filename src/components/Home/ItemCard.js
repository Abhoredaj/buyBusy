
import { useProductContext } from "../../context/productContext";

import styles from "../../Styles/home.module.css";


export default function ItemCard(props){
    
    const {name,image,price,category}=props.item;
    const {addToCart, isAdding}=useProductContext();

    return(
        <>  
            <div className={styles.cardContainer} >
                
                <div className={styles.imageContainer}>
                    <img src={image} alt={category} />
                </div>

                <div className={styles.itemInfo}>
                    <div className={styles.namePrice}>
                        <div className={styles.name}>
                            {name}
                        </div>

                        <div className={styles.price}>
                            ₹{price}   
                        </div>
                    </div>
                    

                    <div className={styles.btnContainer}>
                        <button className={styles.addBtn}
                                onClick={() => addToCart(props.item)}
                                disabled={isAdding}>
                            {isAdding ? 'Adding item...' : 'Add to Cart'}
                        </button>
                    </div> 

                </div>

            </div>
        </>
    )
}