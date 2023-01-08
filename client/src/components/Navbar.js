//perfectly working code leaving the toggle functionality
// //import React, {useContext} from 'react'
// import 'bootstrap/dist/css/bootstrap.css';
// import { NavLink } from 'react-router-dom';
// //import {UserContext} from "../App";


// const navbar = () => {

//   //const { state, dispatch } = useContext(UserContext);


//   return (
//     <>
//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <NavLink className="navbar-brand" to="#">Navbar</NavLink>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav ms-auto">
//       <li className="nav-item active">
//         <NavLink className="nav-link" to="/">Home 
//         </NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink className="nav-link" to="/about">About</NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink className="nav-link" to="/contact">Contact Us</NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink className="nav-link" to="/login">Login</NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink className="nav-link" to="/signup">Registration</NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink className="nav-link" to="/logout">Logout</NavLink>
//       </li>
      
//     </ul>
    
//   </div>
// </nav>
//     </>
//   )
// }

// export default navbar
//perfectly working code leaving the toggle functionality ends here..
 import React, {useContext} from 'react'
 import 'bootstrap/dist/css/bootstrap.css';
 import { NavLink } from "react-router-dom";
 // import logo from "../images/logo2.png";
 import {UserContext} from "../App"
 const Navbar = () => {

  const { state, dispatch } = useContext(UserContext);
  console.log(`the navbar user ${state} and ${dispatch}`);
    
    const RenderList = () => {
      
        if (state) {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/about">AboutMe</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/attendance">Attendance</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </>
                
            )
        } else {
            return (
                <>
                    <li className="nav-item active">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/">Home </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/about">AboutMe</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/contact">Contact</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/attendance">Attendance</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/login">Login</NavLink>
                    </li>
                    
                    <li className="nav-item">
                        <NavLink exact activeClassName="active-page" className="nav-link" to="/signup">Register</NavLink>
                    </li>
                  
                    
                </>
            )
        }
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <NavLink className="navbar-brand" to="#">
                        {/* <img src={logo} alt="logo" /> */}
            </NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              
                <RenderList />
      
              
            </ul>
            </div>
            </nav>
        </>
    )
}

export default Navbar
{/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
<NavLink className="navbar-brand" to="#">
    {/* <img src={} alt="logo" /> */}
// </NavLink>
// <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
// <span className="navbar-toggler-icon"></span>
// </button>

// <div className="collapse navbar-collapse" id="navbarSupportedContent">
// <ul className="navbar-nav ml-auto">

// <RenderList />


// </ul>
// </div>
// </nav> */}
