import React, { useEffect, useState } from 'react'
import studentpic from "../images/clipart1419589.png";
import {useNavigate} from 'react-router-dom';
import {NavLink} from "react-router-dom";

const About = () => {

const [userData, setUserData] = useState({});
const navigate = useNavigate();

const callAboutPage= async ()=>{
   try{
     const res= await fetch('/about',{
       method:"GET",
       headers:{
         Accept: "application/json",
         "Content-Type":"application/json"
       },
       credentials:"include"
     })
     const data= await res.json();
     setUserData(data);
     console.log(data)
     if(!res.status===200){
       const error=new Error(res.error);
       throw error;
     }
   }catch(err){
     console.log(err);
     navigate("../login", { replace: true });
   }
 }

 useEffect(()=>{
   callAboutPage();
 }, []);
// const atc=userData.attendances.length;
  return (
    <>
      <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                  <img src={studentpic} alt="yourIcon" />
                            </div>                          
                        </div>

                         <div className="col-md-6">
                            <div className="profile-head">
                                <h5>
                                  { userData.name}
                                  </h5>
                                <h6>
                                  { userData.work}
                                  </h6>
                                {/* <p className="profile-rating mt-3 mb-5">RANKINGS: <span> 1/10 </span></p> */}


                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                   <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Your Info</a>
                                    </li>
                                    <li className="nav-item">
                                       <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Other Info</a>
                    
                                    </li>
                                </ul>
                           </div>
                        </div>

                        <div className="col-md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>

                    </div>



                    <div className="row">
                        {/* left side url  */}
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p> WORK LINK</p>
                                <a href="https://www.rgipt.ac.in/" target="_blank">College Website</a> <br />
                                <a href="https://www.youtube.com/@RGIPTOfficial/about" target="_blank">Youtube RGIPT</a> <br />
                                <a href="https://www.linkedin.com/in/gargi-srivastava-0974b987" target="_blank">Faculty Advisor TnP, LinkedIN</a> <br />
                                <a href="">Cv of Students</a> <br />                             
                                
                            </div>
                        </div> 

                        {/* right side data toogle  */}

                        <div className="col-md-8 pl-5 about-info">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                               <p>User Id</p>
                                            </div>
                                            <div className="col-md-6">
                                            <p>{ userData._id}</p>
                                            </div>
                                            
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p>Name</p>
                                            </div>
                                            <div className="col-md-6 ">
                                                <p>{ userData.name}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Email</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{ userData.email}</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Phone</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{ userData.phone}</p>
                                            </div>
                                         </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Attendance</p>
                                            </div>
                                            <div className="col-md-6">
                                            <NavLink to="/attendance" >Go to Attendance Page.</NavLink>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Profession</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p>College</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Rajiv Gandhi Institute Of Petroleum Technology</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Open to Opportunities</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Yes</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Interest</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>SDE, Cloud, ML, DataScience, Cloud, Blockchain</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Languages</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>English, Hindi</p>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-md-6">
                                                <p>Desired Work Location</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p>Bangalore, Hyderabad, Gurugram</p>
                                            </div>
                                        </div>
                              
                            </div>
                        </div>
                    </div>
                    </div>
                </form>
           </div>
    </>
  )
}

export default About
