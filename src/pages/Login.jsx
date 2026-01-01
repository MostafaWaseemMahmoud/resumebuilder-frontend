import React, { useEffect, useState } from 'react';
import {Loader, Lock, Mail, User2Icon} from 'lucide-react'
import { apiUrl } from '../app/store';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const Login = ()=> {
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state")
    const [state, setState] = useState(urlState || "login")
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();

    const [isLoading,setIsLoading] = useState(false);


    useEffect(()=>{
        if(window.localStorage.getItem("id")){
            // 6952ec3aa764e1cbd0f7fe66
            navigate("/")
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(state == 'login'){
            const data = {
            email:formData.email,
            password:formData.password,
        };
        console.log(data);
        setIsLoading(true)
        await axios.post(`${apiUrl}api/users/login`,data).then((res)=> {
            window.localStorage.setItem('token' , res.data.token);
            window.localStorage.setItem('id' , res.data.user._id);
            navigate("/")
        }).catch(async(e)=>{
           alert(e.response.data.message);
           console.log(e)
        }).finally(()=>{
            setIsLoading(false)
        })
        }else {
 console.log("Siging Up Runnning");
        const data = {
            name:formData.name,
            email:formData.email,
            password:formData.password,
        };
        console.log(data);
        setIsLoading(true)
        await axios.post(`${apiUrl}api/users/register`,data).then((res)=> {
            window.localStorage.setItem('token' , res.data.token);
            window.localStorage.setItem('id' , res.data.user._id);
            navigate("/")
        }).catch(async(e)=>{
           alert(e.response.data.message)
        }).finally(()=>{
            setIsLoading(false)
        })
        }
     }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
      <div className='flex items-center justify-center min-h-screen bg-green-600'>


            <form onSubmit={handleSubmit} className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white">
                <h1 className="text-gray-900 text-3xl mt-10 font-medium">{state === "login" ? "Login" : "Sign up"}</h1>
                <p className="text-gray-500 text-sm mt-2">Please {state} to continue</p>
                {state !== "login" && (
                    <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                        <User2Icon size={16} color='#6B7280'/>
                        <input type="text" name="name" placeholder="Name" className="border-none outline-none ring-0" value={formData.name} onChange={handleChange} required />
                    </div>
                )}
                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Mail size={16} color='#6B7280'/>
                    <input type="email" name="email" placeholder="Email id" className="border-none outline-none ring-0" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <Lock size={16} color='#6B7280'/>
                    <input type="password" name="password" placeholder="Password" className="border-none outline-none ring-0" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mt-4 text-left text-green-600">
                    <button className="text-sm" type="reset">Forget password?</button>
                </div>
                {!isLoading ?<button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-green-600 hover:opacity-90 transition-opacity">
                    {state === "login" ? "Login" : "Sign up"}
                </button>: <div className="flex align-center justify-center w-full mt-10 mb-10 loding"><Loader /></div>}
                <p onClick={() => {setState(state == 'login' ? 'signup' : 'login'); console.log(state)}} className="text-gray-500 text-sm mt-3 mb-11">{state === "login" ? "Don't have an account?" : "Already have an account?"}<a href="#" className="text-green-600 hover:underline">click here</a></p>
            </form>
            
</div>
    )
}

export default Login;