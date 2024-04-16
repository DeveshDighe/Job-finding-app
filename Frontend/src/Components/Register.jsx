import React, { useRef } from 'react';
import NavBar from './NavBar';
import { Link,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../Configer/config';


function RegisterForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    const userData = {name , email, password}

    if (password !== confirmPassword) {
      toast.error('password and confirmpassword not matched')
    }

    try {
      const responce = await api.post('user/register', userData)
      console.log(responce , 'resiter responce');
      if (responce.data.success) {
        console.log(responce , 'responce');
        toast.success(responce.data.msg)
        navigate('/login')
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 mb-96">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 ">Name:</label>
          <input type="text" id="name" ref={nameRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
          <input type="email" id="email" ref={emailRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
          <input type="password" id="password" ref={passwordRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label>
          <input type="password" id="confirmPassword" ref={confirmPasswordRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
      <p className=' mb-3'>Login to an account<Link className=' text-blue-400' to={'/login'}> Login</Link></p>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
