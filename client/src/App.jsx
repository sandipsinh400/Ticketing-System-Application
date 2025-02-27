import 'bootstrap/dist/js/bootstrap.bundle.js'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateTicket from './pages/CreateTicket';
import "bootstrap/dist/css/bootstrap.min.css";
import ViewTicket from './pages/ViewTicket';
import Loginauth from './pages/Loginauth';
import Signupauth from './pages/Signupauth';
import Header from './layout/Header';
import Singleuser from './pages/Singleuser';
import Completedticket from './pages/Completedticket';
import Assignticket from './pages/Assignticket';
import RejectTicket from './pages/RejectTicket';
import Unauthorized from './pages/Unauthorized';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './protected/Protected';



function App() {

  return (
    <>
     
       <BrowserRouter>
            <Header />
            <Routes>
               
                <Route path="/login" element={<Loginauth />} />
                <Route path="/signup" element={<Signupauth />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

              
                <Route element={<ProtectedRoute />}>
                 <Route path="/" element={<CreateTicket />} />
                    <Route path="/View" element={<ViewTicket />} />
                    <Route path="/user/:id" element={<Singleuser />} />
                    <Route path="/complete" element={<Completedticket />} />
                    <Route path="/assign" element={<Assignticket />} />
                    <Route path="/reject" element={<RejectTicket />} />
                </Route>
            </Routes>
            <Toaster />
        </BrowserRouter>

    </>
  )
}

export default App
