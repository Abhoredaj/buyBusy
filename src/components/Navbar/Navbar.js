
import { useUserAuth } from "../../context/UserAuthContext";
import { useNavigate } from "react-router";

import styles from "../../Styles/navbar.module.css";

import { Outlet, NavLink } from "react-router-dom";


export default function Navbar(){
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await logOut();
          navigate("/");
        } catch (error) {
          console.log(error.message);
        }
      };

    return(
        <>
            <div className={styles.navbarContainer}> 
                <div className={styles.appName}>
                    <NavLink to="/home">
                        <i class="fa-solid fa-shop"></i>
                        Buy Busy
                    </NavLink>
                </div>

                <div className={styles.navLinks}>

                    <NavLink to="/home">
                        <span>
                            <i class="fa-solid fa-house"></i>
                            Home
                        </span>
                    </NavLink>

                    {user && <NavLink to="/myorder">
                        <span>
                            <i class="fa-solid fa-bag-shopping"></i>
                            My Order
                        </span>
                    </NavLink> }

                    {user && <NavLink to="/cart">
                        <span>
                            <i class="fa-sharp fa-solid fa-cart-shopping"></i>
                            Cart
                        </span>
                    </NavLink> }

                    <NavLink to={!user?"/":"/home"}>
                        <span>
                            {!user?
                                <>
                                    <i class="fa-solid fa-right-to-bracket"></i>
                                    SignIn
                                </>
                                :
                                <>
                                    <i class="fa-solid fa-right-from-bracket"></i>
                                    <span onClick={handleLogout}>SignOut</span>
                                </>
                            }
                        </span>
                    </NavLink>
                </div>
            </div>
            {/* render child pages */}
            <Outlet />
        </>
    )
}