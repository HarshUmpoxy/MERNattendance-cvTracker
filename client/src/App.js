// import React, {useReducer, createContext} from 'react';
// import {Route, Routes} from 'react-router-dom';
// // import {Route} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.css";
// import "./App.css";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Signup from "./components/Signup";
// import Login from './components/Login';
// import Errorpage from './components/Errorpage';
// import Logout from './components/Logout';

// import { initialState, reducer } from "./reducer/UseReducer";

// // we create a contextAPI 
// export const UserContext = createContext();


// // const Routing = () => {
  
// //   return (
// //     <>
// //        <Switch>
// //       <Route exact path="/">
// //         <Home />
// //       </Route>

// //       <Route path="/about">
// //         <About />
// //       </Route>

// //       <Route path="/contact">
// //         <Contact />
// //       </Route>

// //       <Route path="/login">
// //         <Login />
// //       </Route>

// //       <Route path="/signup">
// //         <Signup />
// //       </Route>
        
// //       {/* <Route path="/logout">
// //         <Logout />
// //       </Route> */}
      
// //       {/* <Route>
// //         <ErrorPage />
// //       </Route> */}
// //     </Switch>
// //     </>
// //   )
// // }



// const App = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (

//     <UserContext.Provider value={{state, dispatch}}>
        
//         <Navbar/>
//        <Routes>  
//        <Route path="/" element={<Home />} />
//        <Route path="/about" element={<About />} />
//        <Route path="/contact" element={<Contact />} />
//        <Route path="signup" element={<Signup />} />
//        <Route path="/login" element={<Login />} />
//        <Route path="/logout" element={<Logout />} />
//        <Route path="*" element={<Errorpage/>}/>
//        </Routes>

//       </UserContext.Provider>
//     // <>
//     // <Navbar/>
//     // <Routes>  
//     // <Route path="/" element={<Home />} />
//     // <Route path="/about" element={<About />} />
//     // <Route path="/contact" element={<Contact />} />
//     // <Route path="signup" element={<Signup />} />
//     // <Route path="/login" element={<Login />} />
//     // <Route path="*" element={<Errorpage/>}/>
//     // </Routes>
    
//     //</>
//   )
// }
// // const cors = require("cors");
// // App.use(cors());
// export default App


import React, {useReducer, createContext} from 'react'
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ErrorPage from "./components/Errorpage";
import Logout from "./components/Logout";
import Attendance from './components/Attendance';

import { initialState, reducer } from "./reducer/UseReducer";


// we create a contextAPI 
export const UserContext = createContext();

  

const Routing = () => {
  
  return (
    <>
       <Routes>  
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />
       <Route path="/contact" element={<Contact />} />
       <Route path="signup" element={<Signup />} />
       <Route path="/login" element={<Login />} />
       <Route path="/attendance" element={<Attendance />} />
       <Route path="/logout" element={<Logout/>}></Route>
       <Route path="*" element={<ErrorPage/>}/>
       </Routes>
    </>
  )
}

const App = () => {

  //* we use useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
   
      <UserContext.Provider value={{state, dispatch}}>
        
        <Navbar />
        <Routing />

      </UserContext.Provider>
  )
}

export default App


