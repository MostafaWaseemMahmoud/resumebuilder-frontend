import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../app/store";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const logoutUser = async () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/");
  };

    const getuserdata = async ()=> {
    setIsLoading(true)
    await axios.get(`${apiUrl}api/users/data`,{headers: {authorization: `${window.localStorage.getItem('token')}`}}).then((res)=>{
      setUserName(res.data.user.name)
      window.localStorage.setItem("userName" , res.data.user.nane)
    }).catch((e)=> {
      alert("Can't Getting user data");
      console.log(e)
    }).finally(()=>{
      setIsLoading(false)
    })
  }

  useEffect(() => {
    getuserdata();
  }, []);

  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-11 w-auto" />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <p className="max-sm:hidden">
            {isLoading ? "Loading..." : `Hi, ${userName}`}
          </p>

          <button
            onClick={logoutUser}
            className="bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
