import { useState, useEffect } from "react";

import FilterBar from "../components/Home/FilterBar";
import MainContent from "../components/Home/MainContent"; 

import styles from "../Styles/home.module.css";

import Loader from "../components/Loader/Loader";

function Home(){

    const [isLoading,setLoading]=useState(true);

    const [applyFilter,setApplyFilter]=useState(false);

    const [price,setPrice]=useState(5000);
    const [category,setCategory]=useState('none');

    const [search,setSearch]=useState('');

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },400);            
    },[]);


    return(
        <>
        {isLoading?<Loader />:
            <>
            <div className={styles.header}>
                
                <input type="text" 
                    placeholder="Search Item..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>

                <button onClick={() => setApplyFilter(!applyFilter)}>
                    {applyFilter?"Cancel":"Apply Filter"}
                </button>
            </div>

            <div className={styles.mainContainer}>
                {applyFilter && <FilterBar price={price}
                                            setPrice={setPrice}
                                            setCategory={setCategory} />}
                
                <MainContent search={search}
                             price={price}
                             category={category}
                             applyFilter={applyFilter} />
            </div>
        </>}
        </>
    );
}


export default Home;