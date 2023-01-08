import React, { useEffect, useState } from 'react'
// import imagepic from "../images/imagepic.png";
import {UNSAFE_NavigationContext, useNavigate} from 'react-router-dom';
// const key=process.env.KEY;
const date=new Date(Date.now());//to be used in attendance message

const Attendance = () => {

    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const callAttendancePage= async ()=>{
    try{
        const res= await fetch('/getdata',{
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
    callAttendancePage();
    }, []);


//getting location part..
let city;
let latitude; let longitude;
const findMyState= ()=>{

  const status= document.querySelector('.status');
  const atc=userData.attendances.length;
  document.getElementById('attendance-count').innerHTML = userData.attendances.length+1; 

  const success=(GeoLocationPosition) =>{
      console.log(GeoLocationPosition);
      latitude= GeoLocationPosition.coords.latitude;
      longitude=GeoLocationPosition.coords.longitude;
      console.log(latitude + ' ' + longitude);
      document.getElementById('lat').innerHTML = latitude;
      document.getElementById('lon').innerHTML = longitude;
      const geoApiUrl=`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=85dd9f2ca78c45aa818ddb7325e1d76b`;

      fetch(geoApiUrl)
      .then(res => res.json())
      .then(data=>{
          // console.log("Hey");
          console.log(data);
          status.textContent=data.results[0].formatted;
          city=data.results[0].formatted;
          console.log(city);
      })
  }
  const error= () =>{
      status.textContent="Unable to retrive your location";
  }
  navigator.geolocation.getCurrentPosition(success, error);
}

// document.querySelector('.find-state').addEventListener('click', findMyState);

//verifying location part
// const isInCorrectLocation='false';
// if(city=="Tiloi, India")//navbar jaisi condition,...
// {isInCorrectLocation=true;}

//storing data in state
 const handleInputs=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
  
    setUserData({...userData,[name]:value });
}
  
  //sending the data to the backend...
  const attendanceForm = async (e) => {
    findMyState();
    var isBreak=false;
    if(latitude>28 || latitude<25 || longitude<79 || longitude>82){
      console.log("Out of Desired Location.");
      isBreak=true;
    }
    
    e.preventDefault();
    if(!isBreak){
    const { name, email, attendance } = userData;
  
    const res = await fetch('/attendance', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name, email, attendance
        })
    });
  
    const data = await res.json();
    
    if (!data) {
        console.log("message not send/attendance not marked ");
    } else {
        alert("Message Send/Attendance Marked");
        setUserData({ ...userData, attendance: "" });
    }
  }
  
}

  // if(isInCorrectLocation){
  //   attendanceForm();
  // }
  

  return (
    <>
         <div className='contact_form'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1'>
            <div className='contact_form_container py-5'>
              <div className='contact_form_title'>
                Attendance Register
              </div>
              <form method="POST" id="contact_form">
                  <div className='contact_form_name d-flex justify-content-between align-items-between'>
                    <input type='text' id='contact_form_name' className='contact_form_name input_field' name="name" placeholder='My Name' onChange={handleInputs} value={userData.name} required='true'/>

                    <input type='email' id='contact_form_email' className='contact_form_email input_field' name="email" placeholder='My Email' onChange={handleInputs} value={userData.email} required='true'/>

                <input type='number' id='contact_form_phone' className='contact_form_phone input_field' name="number" placeholder='My Phone' onChange={handleInputs} value={userData.phone} required='true'/> 

                  </div>                    
                  <div className='contact_form_text mt-5'>
                    <h3>Attendance Date</h3>
                    <p>Take care to mark attendance once for a day.</p>
                    <textarea className='text_field contact_form_message' onChange={handleInputs} value={userData.attendance} name="attendance"  placeholder={date}cols="60" rows='5'/>
                  </div>
                  {/* <div className='contact_form_text mt-5'>
                    <textarea className='text_field contact_form_message'  value={userData.attendance.size()} name="message"  placeholder={date} cols="60" rows='10'/>
                  </div> */}
                   <div className='contact_form_name d-flex justify-content-between align-items-between'>
                  <div className='contact_form_button'> <h2 className='status' ></h2>
                  <h3 id='latitudewala'>Latitude<h3 id='lat'></h3></h3><h3 id='longitudewala'>Longitude<h3 id='lon'></h3></h3>
                      <br/><br/><br/>
                    <button type='submit' className='button contact_submit_button'
                    onClick={attendanceForm}>Mark your attendance for Today.</button>                    
                  </div>
                  </div>
                  <div className='contact_form_text mt-5'>
                  Your total attendance is: - <h4 id='attendance-count'></h4></div>{/*use mongodb for getting size of attendances array */}
              </form>
            </div>
          </div>
        </div>
      </div>
        </div> 
    </>
    
  )

}

export default Attendance
