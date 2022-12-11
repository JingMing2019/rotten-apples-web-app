import React from 'react'
import Navbar from './component/Navbar/NavbarComp'
import './App.css'
import './vendors/css/index.css'
import './vendors/assets/css/custom_bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BookScreen from './component/BookScreen/bookScreen'
import HomeScreen from './component/HomeScreen/homescreen'
import EditProfile from './component/EditProfile/editProfile'
import LogInScreen from './component/LandingScreen/logInScreen'
import Register from './component/LandingScreen/register'
import PrivacyPolicy from './component/LandingScreen/privacyPolicy'
import SearchScreen from './component/SearchScreen/searchScreen'
import UserProfile from './component/ProfileScreen/userProfile'
import AddBook from './component/EditBook/addbook'
import OtherUserProfile from './component/ProfileScreen/otherUserProfile'
import {Provider} from "react-redux";
import store from "./store";

function App() {
  return (
      <>
        <Provider store = {store} >
          <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route path="/">
                <Route index element={<HomeScreen/>}/>
                <Route path="login" element={<LogInScreen/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="register/privacy" element={<PrivacyPolicy/>}/>
                <Route path="home" element={<HomeScreen/>}/>
                <Route path="search/:keyword" element={<SearchScreen/>}/>
                <Route path="search/" element={<SearchScreen/>}/>
                <Route path="book/:id" element={<BookScreen/>}/>
                <Route path="profile/:id" element={<OtherUserProfile/>}/>
                <Route path="profile" element={<UserProfile/>}/>
                <Route path="edit" element={<EditProfile/>}/>
                <Route path="addbook" element={<AddBook/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
          <div className="flex mt-5">
            <h6 className="text-decoration-none text-secondary">
              Copyright © 2022 Rotten Apples Inc. All rights reserved.
            </h6>
          </div>
        </Provider>
      </>
  )
}

export default App

