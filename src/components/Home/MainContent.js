
// import styles 
import styles from "../../Styles/home.module.css";

// import component to render a single item in the list
import ItemCard from "./ItemCard";

// custom context hook 
import { useProductContext } from "../../context/productContext";
// import { data } from "../../Assets/data";

export default function MainContent(props){
    
    const {search,price,category,applyFilter}=props;
     
    const {data} = useProductContext();

    return(
        <div className={styles.itemContainer}>
            {data.filter((item) => {
                    return search.toLocaleLowerCase() === ''
                    ? item
                    :item.name.toLocaleLowerCase().includes(search)})
            .filter((item) => {
                    return !applyFilter
                    ? item
                    :item.price <= price})
            .filter((item) => {
                    return !applyFilter || category === 'none'
                    ? item
                    :item.category === category})
            .map((item) => <ItemCard 
                                    key={item.id} 
                                    item={item} />)}
        </div>
        
    )
}