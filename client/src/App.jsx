import React, { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Learn from './pages/Learn';
import PYQs from './pages/PYQs';
import MyCourses from './pages/MyCourses';
import BecomeTutor from './pages/BecomeTutor';
import Contact from './pages/Contact';
import MyTutors from './pages/MyTutors';
import Login from './pages/Login';
import Register from './pages/Register';
import UpdatePassword from './pages/UpdatePassword.jsx'
import MyProfile from './pages/MyProfile.jsx'
import TutorialDetails from './pages/TutorialDetails.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsFail, userDetailsRequest, userDetailsSuccess } from './reducers/user';
import axios from 'axios';
import AddTutor from './components/AddTutor.jsx'
import UpdateCourse from './pages/UpdateCourse.jsx';
import MyOrders from './pages/MyOrders.jsx';
import Success from './pages/Success.jsx';
import Fail from './pages/Fail.jsx';
import UploadPyq from './pages/UploadPyq.jsx'

const style = { 
  background: 'rgb(249,250,228)',
  background: 'linear-gradient(90deg, rgba(249,250,228,1) 0%, rgba(231,252,229,1) 50%, rgba(255,207,230,1) 100%)',
}

const loadUser = async(dispatch) => {
  try {
    dispatch(userDetailsRequest());

    const me = await axios.get('api/v1/me');

    dispatch(userDetailsSuccess(me));
  } catch (error) {
    dispatch(userDetailsFail())
  }
}



const App = () => {
  let isAuth = useState(useSelector(state => state.user.isAuthenticated))
  const dispatch = useDispatch();
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });

    isAuth && loadUser(dispatch);
    
  }, [isAuth, dispatch]);

  return (
    <div style={style} className=''>
      <Navbar />
      <Routes>
        <Route path='/'>
          <Route index element = {<LandingPage />} />
          <Route exact path='/learn/learn/:id' element = {<TutorialDetails />} />
          <Route exact path='/learn' element = {<Learn />} />
          <Route path='/learn/:keyword' element = {<Learn />} />
          <Route path='/pyqs' element = {<PYQs />} />
          <Route path='/mycourses' element = {<MyCourses />} />
          <Route path='/become-tutor' element = {<BecomeTutor />} />
          <Route path='/contact' element = {<Contact />} />
          <Route path='/mytutors' element = {<MyTutors />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/register' element = {<Register />} />
          <Route path='/me' element = {<MyProfile />} />
          <Route path='/join' element = {<AddTutor />} />
          <Route exact path='/updatePassword' element = {<UpdatePassword />} />
          <Route exact path='/myOrders' element = {<MyOrders />} />
          <Route exact path='/editTutorial/:id' element= {<UpdateCourse />} />
          <Route exact path='/payment/success' element={<Success />} />
          <Route exact path='/payment/cancel' element={<Fail />} />
          <Route exact path='/upload/pyq' element= {<UploadPyq />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
