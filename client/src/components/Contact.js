import React from 'react';
import { useEffect, useState } from 'react';

const Contact = () => {

    const [userContact, setUserContact] = useState({name:"", email:"", phone:"", message:""});

    const callContactPage = async () => {
        try{
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type":"application:json"
                }

            })

            const data = await res.json();
            console.log(data);
            setUserContact({...userContact, name:data.name, email:data.email, phone:data.phone});
            console.log(userContact);

            if(!res.status === 200){
                throw new Error;
            }

        }  catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
      callContactPage();
    }, [])


    // We are storing data in state 
    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name, ": ", value);
        setUserContact({...userContact, [name]:value});
    }
    
    // Send the data to the backend (mongoose)
    const contactForm = async (e) => {
        e.preventDefault();

        const {name, email, phone, message} = userContact;

        const res = await fetch('/contact', {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, phone, message
            })
        })

        const data = await res.json();

        if(!data){
            console.log("Message not found");
        }else{
            alert("Message Send");
            // userContact.message = "";
            setUserContact({...userContact, message:""});
        }

    }

    return(
        <>
        <div className="contact_info">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
                        {/* phone number  */}
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                            <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Phone
                                </div>
                                <div className="contact_info_text">
                                    +91 1111 543 2198
                                </div>
                            </div>
                        </div>

                        {/* email  */}
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                            <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Email
                                </div>
                                <div className="contact_info_text">
                                    abc23@gmail.com
                                </div>
                            </div>
                        </div>

                        {/* address  */}
                        <div className="contact_info_item d-flex justify-content-start align-items-center">
                            <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                            <div className="contact_info_content">
                                <div className="contact_info_title">
                                    Address
                                </div>
                                <div className="contact_info_text">
                                    Delhi, India
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="contact_form">
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="contact_form_container py-5">
                            <div className="contact_form_title">
                                Get In Touch
                            </div>
                            <form method='POST' id='contact_form'>
                                <div className="contact_form_name d-flex justify-content-between align-items-between">
                                    <input type="text" id='contact_form_name' className='contact_form_name input_field'
                                    placeholder='Your Name' required='true' value={userContact.name}
                                    name="name"
                                    onChange={handleInputs}
                                    />
                                    <input type="email" id='contact_form_email' className='contact_form_email input_field'
                                    placeholder='Your Email' required='true' value={userContact.email}
                                    name="email"
                                    onChange={handleInputs}
                                    />

                                    <input type="number" id='contact_form_phone' className='contact_form_phone input_field'
                                    placeholder='Your Phone Number' required='true' value={userContact.phone}
                                    name="phone"
                                    onChange={handleInputs}
                                    />
                                </div>

                                <div className="contact_form_text mt-5">
                                    <textarea className='text_field contact_form_message' id="" cols="30" rows="10"
                                    placeholder='Message'
                                    value={userContact.message}
                                    name="message"
                                    onChange={handleInputs}
                                    ></textarea>
                                </div>

                                <div className="contact_form_button">
                                    <button type="submit" className="button contact_submit_button"
                                    onClick={contactForm}
                                    >Send Message</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Contact