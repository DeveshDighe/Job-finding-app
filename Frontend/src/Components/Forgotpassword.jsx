import React, { useRef, useState } from 'react';
import { api } from '../Configer/config.js';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Forgotpassword = () => {
  const email = useRef('');
  const otp = useRef('');
  const password = useRef('');

  const navigate = useNavigate();

  const [FieldNumber, setFieldNumber] = useState(1);

  const handleForgetSubmit = async (e) => {
    e.preventDefault();

    // To get otp
    if (FieldNumber === 1) {
      const useremail = email.current.value;
      try {
        const response = await api.post('user/forget-password-addemail', { useremail });
        if (response.data.success) {
          toast.success(response.data.msg);
          setFieldNumber(2);
        }
        console.log(response, 'response');
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error)
      }
    }

    // To send otp
    if (FieldNumber === 2) {
      const userotp = otp.current.value;
      const useremail = email.current.value;
      try {
        const response = await api.post('user/forget-password-otp', { useremail, userotp });
        if (response.data.success) {
          toast.success(response.data.msg);
          setFieldNumber(3);
        }
        console.log(response, 'response');
      } catch (error) {
        toast.error(error.response.data.error)
        console.log(error);
      }
    }

    // To add password
    if (FieldNumber === 3) {
      const userpassword = password.current.value;
      const useremail = email.current.value;

      try {
        const response = await api.post('user/update-password', { useremail, userpassword });
        if (response.data.success) {
          toast.success(response.data.msg);
          setFieldNumber(1);
          navigate('/login');
        }
        console.log(response, 'response');
      } catch (error) {
        toast.error(error.response.data.error)
        console.log(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 h-[600px]">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => handleForgetSubmit(e)}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email :</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter Email' ref={email} type="text" id='email' />
        </div>
        {FieldNumber === 2 && (
          <div className="mb-4">
            <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2">OTP :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter OTP' ref={otp} type="text" id='otp' />
          </div>
        )}
        {FieldNumber === 3 && (
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password :</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='Enter New Password' ref={password} type="password" id='password' />
          </div>
        )}
        <div className="flex items-center justify-between">
          {FieldNumber === 1 ? (
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Get OTP</button>
          ) : FieldNumber === 2 ? (
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add OTP</button>
          ) : (
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add New Password</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Forgotpassword;
