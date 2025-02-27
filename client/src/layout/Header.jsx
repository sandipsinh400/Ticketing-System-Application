import axios from 'axios';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { LogoutUser } from '../redux/AuthSlice';


const Header = () => {
    const navigate = useNavigate();
    const dispatch =useDispatch()

    const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }
    

    const handleLogout = async () => {
        try {
         const res = await axios.post("https://ticketing-system-application.onrender.com/api/admin/logout", {}, { withCredentials: true });
          localStorage.removeItem("token"); 
          if(res.data.success){
            toast.success(res.data.message)
            navigate("/login")
            dispatch(LogoutUser())
           }else{
            toast.error(res.data.message)
           }
        } catch (error) {
            toast.error(error)
        }
      };
    
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              
                <div><img src="../public/vite.svg" alt="55" />
               <span className='text-danger'>Ticket Generation</span>
               </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto">
                    </ul>
                    <button class="Btn" onClick={handleLogout}>

                        <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                        <div class="text">Logout</div>
                    </button>

                </div>
            </div>
        </nav>

        </>
        
    )
}

export default Header