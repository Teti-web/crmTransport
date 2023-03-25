import React from "react";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./page/Dashboard/Dashboard";
import Login from "./page/Login/Login";
import NotFound from "./page/NotFound/NotFound";
import Register from "./page/Register/Register";
import Contact from "./page/ContactPage/ContactPage";
import ForgotPassword from "./page/auth/ForgotPassword";
import Profil from './page/Profil/Profil'
import Calendar from './page/Calendar/Calendar';
import Cars from './page/Cars/Cars';
import Clients from './page/Clients/Clients';
import Drivers from './page/Drivers/Drivers';
import RoutesPage from './page/routesPage/Routes'
import EditProfil from "./page/Profil/EditProfil";
import EditEvent from "./page/Calendar/EditEvent";


export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Routes>
                 <Route path='/' element={<Dashboard/>} exact/>
                 <Route path='*' element={<NotFound/>}/>
                 <Route path='/profil' element={<Profil/>}/>
                 <Route path='/profile-edit' element={<EditProfil/>}/>
                 <Route path='/contact' element={<Contact/>}/>
                 <Route path='/calendar' element={<Calendar/>}/>
                 <Route path='/event-edit/:id' element={<EditEvent/>}/>
                 <Route path='/cars' element={<Cars/>}/>
                 <Route path='/clients' element={<Clients/>}/>
                 <Route path='/drivers' element={<Drivers/>}/>
                 <Route path='/routes' element={<RoutesPage/>}/>
            </Routes>
        )
    }

    return(
        <Routes>
             <Route path='/' element={<Login/>}/>
             <Route path='/login' element={<Login/>}/>
             <Route path='/register' element={<Register/>}/>
             <Route path='/contact' element={<Contact/>}/>
             <Route path='/forgotpassword' element={<ForgotPassword/>}/>
             <Route path='*' element={<NotFound/>}/>
        </Routes>
    )
}