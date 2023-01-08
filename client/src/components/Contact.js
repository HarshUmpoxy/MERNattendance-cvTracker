import React, {useEffect, useState} from 'react'
import phonepic from "../images/phoneicon.png";
import emailpic  from "../images/email.png";
import locationpic  from "../images/location.png";
const Contact = () => {

const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});


const userContact= async ()=>{
   try{
     const res= await fetch('/getdata',{
       method:"GET",
       headers:{         
         "Content-Type":"application/json"
       },
     })
     const data= await res.json();
     setUserData({...userData, name:data.name,email: data.email,phone: data.phone });
     console.log(data)
     if(!res.status===200){
       const error=new Error(res.error);
       throw error;
     }
   }catch(err){
     console.log(err);
    }
 }

 useEffect(()=>{
   userContact();
 }, []);

 //storing data in state
 const handleInputs=(e)=>{
  const name=e.target.name;
  const value=e.target.value;

  setUserData({...userData,[name]:value });
 }

//sending the data to the backend...
const contactForm = async (e) => {
  e.preventDefault();

  const { name, email, phone, message } = userData;

  const res = await fetch('/contact', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          name, email, phone, message
      })
  });

  const data = await res.json();

  if (!data) {
      console.log("message not send ");
  } else {
      alert("Message Send");
      setUserData({ ...userData, message: "" });
  }

}

  return (
    <>
    <div className='contact-info'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
          {/* //contact info  */}
            <div className='contact-info-item d-flex justify-content-start align-items-center'>
            <img src={phonepic} className='contactwalaicons' alt='phone'/>
            <div className='contact_info_content'>
                <div className='contact_info_title'>
                    Phone
                </div>
                <div className='contact_info_text'>
                  +91 1111 2222
                </div>
            </div>
          </div>

          {/* email */}
            <div className='contact-info-item d-flex justify-content-start align-items-center'>
              <img src={emailpic} className='contactwalaicons' alt='phone'/>
              <div className='contact_info_content'>
              <div className='contact_info_title'>
                  Email
              </div>
              <div className='contact_info_text'>
                20cs3031@rgipt.ac.in
              </div>
            </div>
            </div>

            {/* address number */}
            <div className='contact-info-item d-flex justify-content-start align-items-center'>
              <img src={locationpic} className='contactwalaicons' alt='phone'/>
              <div className='contact_info_content'>
              <div className='contact_info_title'>
                  Address
              </div>
              <div className='contact_info_text'>
                RGIPT Uttar Pradesh, India
              </div>
            </div>
            </div>
            
            
          </div>
        </div>
      </div>

    </div>

    {/* contact form  */}

    <div className='contact_form'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1'>
            <div className='contact_form_container py-5'>
              <div className='contact_form_title'>
                Get in Touch
              </div>
              <form method="POST" id="contact_form">
                  <div className='contact_form_name d-flex justify-content-between align-items-between'>
                    <input type='text' id='contact_form_name' className='contact_form_name input_field' name="name" placeholder='My Name' onChange={handleInputs} value={userData.name} required='true'/>

                    <input type='email' id='contact_form_email' className='contact_form_email input_field' name="email" placeholder='My Email' onChange={handleInputs} value={userData.email} required='true'/>


                    <input type='number' id='contact_form_phone' className='contact_form_phone input_field' name="number" placeholder='My Phone' onChange={handleInputs} value={userData.phone} required='true'/>

                  </div>

                  <div className='contact_form_text mt-5'>
                    <textarea className='text_field contact_form_message' onChange={handleInputs} value={userData.message} name="message"  placeholder='Your Message' cols="60" rows='10'/>
                  </div>

                  <div className='contact_form_button'>
                    <button type='submit' className='button contact_submit_button' onClick={contactForm}>Send Message</button>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Contact
