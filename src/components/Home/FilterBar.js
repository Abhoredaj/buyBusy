
import styles from "../../Styles/home.module.css";


export default function FilterBar(props){
    const {price,setPrice,setCategory}=props;

    return(

        <div className={styles.filterBar}>

            <h1>
                FilterBar
            </h1>

            <div className={styles.priceRange}>
                <span>Price</span>{` <= ${price}`}
                <br />
                <input type="range" 
                    min="100" 
                    max="50000" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} />
            </div>
                
            <div className={styles.categoryBox}>
                <span>Category:</span>

                <div>
                    <input type="radio" 
                        id="men" 
                        value="men" 
                        name="category" 
                        onClick={()=>setCategory("men")}/>
                    <label for="men">Men</label>
                    
                    <input type="radio" 
                        id="women" 
                        value="women" 
                        name="category"
                        onClick={()=>setCategory("women")}/>
                    <label for="women">Women</label>
                    
                    <input type="radio" 
                        id="electric" 
                        value="electric" 
                        name="category"
                        onClick={()=>setCategory("electric")}/>
                    <label for="electric">Electronic</label>
                    
                    <input type="radio" 
                        id="jewellery" 
                        value="jewellery" 
                        name="category"
                        onClick={()=>setCategory("jewellery")}/>
                    <label for="jewellery">Jewellery</label>

                    <input type="radio" 
                        id="none" 
                        value="none" 
                        name="category"
                        onClick={()=>setCategory("none")}/>
                    <label for="jewellery">None</label>
                </div>

            </div>
            
        </div>
        
    )
}