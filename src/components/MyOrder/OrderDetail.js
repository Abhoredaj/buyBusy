import styles from "../../Styles/myorder.module.css";

export default function OrderDetail(props){

    const {date,list,amount}=props.order;


    return(
        <div>
            <h1 className={styles.orderHeading}>
                Ordered On: {date}
            </h1>

            <table>

                <tr>
                    <th>S.no</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>

                {list.map((product,i) => <tr>
                                            <td>{i + 1}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>x{product.quantity}</td>
                                            <td>₹{product.quantity * product.price}</td>
                                        </tr>)}
                
                <tr>
                    <td colSpan={4}>Grand Total</td>
                    <td>₹{amount}</td>
                </tr>

            </table>
        </div>
    )
}