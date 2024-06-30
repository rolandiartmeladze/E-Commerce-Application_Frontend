import React, { useState, useEffect } from 'react';
import './style.css';

import user from '../../icon/user.png';



import Male1 from '../../img/Avarats/Male1.png';
import Male2 from '../../img/Avarats/Male2.png';

import Female2 from '../../img/Avarats/Female2.png';


type Props2 = {
  avatar: string;
  index: number;
  person: string;
};

type Props = {
  setAvatar: (avatar: string) => void;
  setImage: Function;
  setAvatarName: Function;
  
};


const SelectAvatar: React.FC<Props> = ({ setAvatar , setImage, setAvatarName}) => {


  const Female1 = `https://embarrassing-unifor.000webhostapp.com/Media/Avatars/Female1.png`;
  const Female2 = `https://embarrassing-unifor.000webhostapp.com/Media/Avatars/Female2.png`;

  const Male1 = `https://embarrassing-unifor.000webhostapp.com/Media/Avatars/Male1.png`;
  const Male2 = `https://embarrassing-unifor.000webhostapp.com/Media/Avatars/Male2.png`;

  const Females = [Female1, Female2];
  const Males = [Male1, Male2];

  const select = ({ avatar, index, person }: Props2) => {
    setAvatar(avatar);
    setAvatarName(`${person}${index + 1}`);
    setImage(null);
  };

  return (
<div className='avatar-conteinet'>
      <div className='selected-cont'>
      {Males.map((avatar, index) => (
          <img
          key={`male-${index}`}
          onClick={() => select({ avatar, index, person: 'Male' })}
            className="selected-cont-img"
            src={avatar}
            alt=''
          />
        ))}      </div>
      <div className='selected-cont'>
      {Females.map((avatar, index) => (
          <img key={`female-${index}`}
          onClick={() => select({ avatar, index, person: 'Female' })}
          className="selected-cont-img"
            src={avatar}
            alt=''
          />
        ))}
      </div>

    </div>
      );
};


const Profil: React.FC = () => {
  const [selectAvatar, setSelectAvatart] = useState<boolean>(false);
  const [Avatar, setAvatar] = useState<string>('');
  const [AvatarName, setAvatarName] = useState<string>('');


const avatarlink = `https://embarrassing-unifor.000webhostapp.com/Media/Avatars/${AvatarName}.png`

const select =()=>{

      selectAvatar? setSelectAvatart(false) : setSelectAvatart(true);

}



  const [info, setInfo] = useState<object | any>({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchInfo();
  }, []);

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [reppassword, setRepPassword] = useState('');
  const [address, setAddress] = useState('');
  const [account, setAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [birthday, setBirthday] = useState('');

  const [secretWord, setSecretWord] = useState('');

  async function fetchInfo() {
    try {
      const response = await fetch(`http://localhost:3001/MyInfo/${token}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setInfo(data);
      setName(data.name);
      setLastName(data.lastname);
      setEmail(data?.email);
      setPhone(data?.phone);
      setAddress(data?.address);
      setAvatarName(data?.avatar);

      console.log('Data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }




  const UpdateProfileInfp = async ()=> {
    
    try {
      const response = await fetch(`http://localhost:3001/UpdateProfile/${token}`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ AvatarName }),

      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const [image, setImage] = useState<File | null>(null);

  const Select = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedImages = e.target.files[0];
      setImage(selectedImages);
      console.log(selectedImages);
    }
  };



  return (
    <form id="SingUpForm">
      {/* უზრუნველყოფს ლოდინის რეჟიმს შესაბამისი ქმედების დროს */}
      <h2> Update Profile Info </h2>

      {/* ძირითადი მონაცემების შეყვანის ველები */}

      <section className="container">
        <h3>Personal Information:</h3>

        <div className="item user">

          <div className='img-cont'>
            
         <img id='profilrImg' src={AvatarName? avatarlink : image ? URL.createObjectURL(image): Avatar? Avatar : undefined} alt="" />
          </div>

          <input
             onChange={Select} 
             type="file" 
             id="file"
             required
          />
          
          { selectAvatar && <SelectAvatar setAvatar={setAvatar} setImage={setImage} setAvatarName={setAvatarName} />}
          <div className='label-cont'>
          <label onClick={select} className='label'>{image? 'Select Avatar' : 'Change Avatar'}</label>
          <label  onClick={()=>{selectAvatar && select()}}  className='label' htmlFor="file">{image? 'Change Image' : 'Upload Image'}</label>
          </div>
 </div>



        <div className="item">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="item">
          {/* <img src={txt} alt="" /> */}

          <label>Surname:</label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter Surname"
            required
          />
        </div>

        <div className="item">
          {/* <img src={Mail} alt="" /> */}

          <label>Emile:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />

          {/* <samp style={verified ? verifstyle : undefined} onClick={verifi} className="meilverifi"> <img src={send} alt="" /></samp> */}
        </div>

        <div className="item">
          {/* <img src={Phone} alt="" /> */}

          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone"
            required
          />
        </div>

        <div className="item">
          <label>Address:</label>
          <input
            type="tel"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter Address"
            required
          />
        </div>

        <div className="item">
          <label>Date of birth:</label>
          <input
            style={{ maxWidth: '120px' }}
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder=""
            required
          />
        </div>

        <div className="item">
          <label>Gender:</label>
          <select style={{ maxWidth: '120px' }}>
            <option>Not selected</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
      </section>

      <section className="container">
        <h3>Payment Information:</h3>

        <div className="item">
          <label>Bank name:</label>
          <input
            type="tel"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Bank name"
            required
          />
        </div>

        <div className="item">
          <label>Account:</label>
          <input
            type="tel"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Account Number"
            required
          />
        </div>

        <div className="item">
          <label>Payment:</label>
          <select>
            <option>Not selected</option>
            <option>partial payment</option>
            <option>Full payment</option>
            <option>Payment in installments</option>
          </select>
        </div>

        <div className="item">
          <label>Cyrrency:</label>
          <select>
            <option>Not selected</option>
            <option>USD</option>
            <option>EUR</option>
            <option>GEL</option>
          </select>
        </div>

        <div className="item">
          <label>Unit:</label>
          <select>
            <option>Not selected</option>
            <option>PIC</option>
            <option>L</option>
            <option>M</option>
            <option>KG</option>
          </select>
        </div>
      </section>

      <section className="container">
        <h3>Private Information:</h3>

        <div>Secret Word:</div>
        <div className="item">
          <label>Word</label>
          <input
            id="word"
            type="text"
            value={secretWord}
            onChange={(e) => {
              setSecretWord(e.target.value);
            }}
            placeholder="Enter word"
            required
          />
        </div>

        <div>Change Password:</div>
        <div className="item">
          <label>New</label>
          <input
            id="pass"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              // checkPassword(e.target.value);
              // checkRepPassword(e.target.value, password);
            }}
            placeholder="Enter New Password"
            required
          />
          {/* <img style={{ margin: '0px 6px', cursor: 'pointer' }}
                            onClick={() => { showpass(showPass, setShowPass) }}
                            src={showPass ? hide : View} alt="" /> */}
        </div>
        <div className="item">
          <label>Repeat</label>

          <input
            id="RepPass"
            style={{ borderBottom: 'red solid 2px' }}
            type="password"
            value={reppassword}
            onChange={(e) => {
              setRepPassword(e.target.value);
              // checkRepPassword(e.target.value, password);
            }}
            placeholder="Repeat Password"
            required
          />
        </div>

        {/* _____ */}
      </section>

      <div>
        <button onClick={()=>{UpdateProfileInfp()}} className="singup">Update Info</button>
      </div>
    </form>
  );
};


export default Profil;
