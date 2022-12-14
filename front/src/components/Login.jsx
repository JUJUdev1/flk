import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FcGoogle } from 'react-icons/fc';
import loginBG from '../assets/loginBG.jpeg';
import logo from '../assets/logowhite.png';
import { useNavigate } from 'react-router-dom';
import { client } from '../client';
import jwt_decode from 'jwt-decode';


const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = (response) => {

    const userResponse = jwt_decode(response.credential);

    localStorage.setItem('user', JSON.stringify(userResponse));
    const { name, sub, picture } = userResponse;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
  }

    client.createIfNotExists(doc).then(()=>{
      navigate('/', {replace: true})
  });
  }




  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <img
          src={loginBG}
          alt="loginBG"
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt='logo' />
          </div>

          <div className="shadow-2xl">
            <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
            <GoogleLogin
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" />
                </button>
              )}
              onSuccess={responseGoogle}
              onError={() => console.log('error')}
              cookiePolicy="single_host_origin"
            />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;