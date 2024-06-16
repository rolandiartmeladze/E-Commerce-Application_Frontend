
// კომპონენტი სტილიზებულია => from "./Tools"

import React, { useState, useEffect } from "react";
import { useNavigate} from 'react-router-dom'; 

import serverUri from '../../component/serverUrl';

// ხდება საჭირო სტყლის კომპონენტებისა და საერთო ფუნქციების ინპორტო ამავე კომპონენტის => from "./Tools"
import { 
        Form, FooterComp, HeaderComp,
        Mail, Pass, Phone, user, txt, pass2, repe, View, hide, send, 
        checkPassword, showpass, checkRepPassword, LoadingComponent 
        } from "./Tools";


    // ხდება მეილის ვალიდაციისთვის საჭირო სტილიზებული ელემენტის გამოძახება  
    //  არ არის ოპტიმიზებული საჭიროებს დამუავებას (ფორმალური);
import VerifiMeil from "./VerifiMeil";



const SignUp = () => {

    const serverlink = serverUri();
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);

    //მომხმარებლის მერ შეყვანილი მონაცემები ინახება ცვლადებში
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [reppassword, setRepPassword] = useState('');
    const [address, setAddress] = useState('');
        //____

    const [errorMessage, setErrorMessage] = useState('');


    // ფუნქცია აგზავნის მომხმარებლის მიერ შეყვანილ მონაცემებ სერვერზე მონაცემთა ბაზაში ჩასაწერად
    const registerUser = async () => {
        setLoading(true);

        try {
            const formData = {
                name: name,
                lastname: lastname,
                email: email,
                phone: phone,
                password: password,
                address: address
            };

            const response = await fetch(`${serverlink}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) { navigate('/login'); setLoading(false) }
            else {
                const errorData = await response.json();
                // აბრუნებს ერორს იმ შემტხვევაში თუ შეყვანილი მეილი უკვე ფიქსირდება მონაცემთა ბაზაში
                setErrorMessage(errorData.message);
                setLoading(false);
                // console.log(errorMessage)
            }
        } catch (error) { console.error('Error registering user:', error); }
    };


        //უზრუნველყოფს რეგისტრაციის მოთხოვნის გაგზავნას სერვერზე შესაბამის ღილაკზე დაჟერის ან ენტერ ღილაკის გამოყენების შემტხვევაში
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        await registerUser();
    };

    // უზრუნველყოფს რეგისტრაციის კომპონენტის დინამიური ამონთებას გამოძახების შემთხვევაში
        useEffect(()=>{
                const singapform = document.getElementById('SingUpForm');
            if(singapform){
                setTimeout(() => {
                    singapform.style.translate = '0';
                    setTimeout(() => {
                        singapform.style.transform = 'scale(1)';
                    }, 700);
                }, 100);
            }
        }, [])



    const inputstyle = {display: 'flex', width: '80%', marginLeft: '20%' };
    const verifstyle = {color: 'green', pointerEvents: 'none', opacity: '0.5'}

    const [showPass, setShowPass] = useState(false);
    const [verif, setVerif] = useState(false);
    const [verified, setVerified] = useState(false);


    // ვალიდაციის შემოწმება ამოწმებს შეყვანილი მეილის მონაცემები არის თუ არა სწორი ფორმატით ჩაწერილი  (user@gmail.com) ...

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
    

      // მეილის ვერიფიკაციის ფუნქცია ამჯამად ფორმალურად არის 
    const verifi = () => {
        if (validateEmail(email)) {
          setVerif(!verif);
        } else {
          alert("Please enter a valid email address.");
        }
      };
    


    return (<>

        <HeaderComp navigate={navigate} title={'Sing Up Form'} />

        <Form id="SingUpForm">
            {/* უზრუნველყოფს ლოდინის რეჟიმს შესაბამისი ქმედების დროს */}
            {loading && <LoadingComponent />}


            {verif && <VerifiMeil email={email} setVerif={setVerif} setVerified={setVerified} />}

            <h2> You are welcome </h2>

        {/* ძირითადი მონაცემების შეყვანის ველები */}

            <div className="item-cont">
                <img src={user} alt="" />

                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" required />
            </div>

            <div className="item-cont">
                <img src={txt} alt="" />

                <label>Surname:</label>
                <input type="text" value={lastname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Surname" required />
            </div>

            <div className="item-cont">
                <img src={Mail} alt="" />

                <label>Emile:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />

                <samp style={verified ? verifstyle : undefined} onClick={verifi} className="meilverifi"> <img src={send} alt="" /></samp>
            </div>

            <div className="item-cont">
                <img src={Phone} alt="" />

                <label>Phone:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter Phone" required />
            </div>


            <div style={{ flexDirection: 'column', alignItems: 'flex-start' }} className="item-cont">
                <div className="pass">

                    <img src={Pass} alt="" />

                    <label>Password:</label>
                    <samp className="example">
                        <span id="App">A</span>-
                        <span id="Low">a</span>-
                        <span id="Num">1</span>-
                        <span id="Sim">!</span>-
                        <span id="length">{'>=8'}</span>
                    </samp>
                    <samp id="result"></samp>
                </div>
                <div style={inputstyle}>
                    <img src={pass2} alt="" />
                    <input id="pass"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            checkPassword(e.target.value);
                            checkRepPassword(e.target.value, password);
                        }}
                        placeholder="Enter Password"
                        required
                    />
                    <img style={{ margin: '0px 6px', cursor: 'pointer' }}
                        onClick={() => { showpass(showPass, setShowPass) }}
                        src={showPass ? hide : View} alt="" />

                </div>
                <div style={inputstyle}>
                    <img src={repe} alt="" />
                    <input id="RepPass" style={{ borderBottom: 'red solid 2px' }} type="password" value={reppassword} onChange={(e) => {
                        setRepPassword(e.target.value);
                        checkRepPassword(e.target.value, password);
                    }} placeholder="Repeat Password" required />
                </div>
            </div>

            <div className="item-cont">
                <label>Address:</label>
                <input type="tel" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required />
            </div>

                {/* _____ */}
                
            <div className="item-cont add">
                <button className="singup" onClick={handleSubmit}>Register</button>
            </div>

        </Form>

        <FooterComp />
        </>);
};

export default SignUp;