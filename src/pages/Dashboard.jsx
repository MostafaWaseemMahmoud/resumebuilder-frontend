import React, { useEffect, useState } from 'react';
import {FilePenLineIcon, Form, Loader, PencilIcon, PlusIcon, TrashIcon, Upload, UploadCloud, UploadCloudIcon, XIcon} from 'lucide-react'
import { dummyResumeData } from '../assets/assets';
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import { apiUrl } from '../app/store';
const Dashboard = ()=> {
  const colors = ['#9333ea' , '#d97706' , "#dc2626" , "#0284c7" , "#16a34a"]
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [allResumes, setAllResumes] = useState([]);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeLoading,setResumeLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    getuserdata();
  },[window.localStorage.getItem("token")])
  
  
  const getuserdata = async ()=> {
    setIsLoading(true)
    await axios.get(`${apiUrl}api/users/data`,{headers: {authorization: `${window.localStorage.getItem('token')}`}}).then((res)=>{
      setUser(res.data.user)
      loadAllResumes();
    }).catch(()=> {
      alert("Can't Getting user data")
    }).finally(()=>{
      setIsLoading(false)
    })
  }
  
  const loadAllResumes = async ()=> {
    setIsLoading(true)
    await axios.get(`${apiUrl}api/users/resumes`,{headers: {authorization: `${window.localStorage.getItem('token')}`}}).then((res)=>{
      setAllResumes(res.data.resumes);
    }).catch(()=> {
      alert("Can't Getting user data")
    }).finally(()=>{
      setIsLoading(false)
    })
 };
 const createResume = async (event) => {
  const data = {
    title: title
  };

  try {
    setResumeLoading(true);

    const token = localStorage.getItem("token");
    console.log(data)
    const res = await axios.post(
      `${apiUrl}api/resumes/create`,
      data,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    setShowCreateResume(false);
    navigate(`/app/builder/${res.data.resume._id}`);

  } catch (err) {
    console.error(err);
    alert("Failed to create resume");
  } finally {
    setResumeLoading(false);
  }
};

const editTitle = async (e) => {
  e.preventDefault();

  try {
    setResumeLoading(true);

    const token = localStorage.getItem("token");

    // 1️⃣ Get current resume data
    const res = await axios.get(
      `${apiUrl}api/resumes/get/${editResumeId}`,
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    const updatedResume = {
          _id: editResumeId,
          title: title,
          personal_info: res.data.resume[0].personal_info,
          professional_summary: res.data.resume[0].professional_summary,
          experience: res.data.resume[0].experience,
          education: res.data.resume[0].education,
          project: res.data.resume[0].project,
          skills: res.data.resume[0].skills,
          template: res.data.resume[0].template,
          accent_color: res.data.resume[0].accent_color,
          public: res.data.resume[0].public,
    };

    console.log(title);
    console.log(updatedResume);
    
    // 3️⃣ Send update
    await axios.put(
      `${apiUrl}api/resumes/update`,
      {
        resumeId: editResumeId,
        resumeData: updatedResume,
        removebackground: false,
      },
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    // 4️⃣ Update UI without reload
    setAllResumes(prev =>
      prev.map(r =>
        r._id === editResumeId
          ? { ...r, title }
          : r
      )
    );

    // close modal
    setEditResumeId("");
    setTitle("");

  } catch (err) {
    console.error(err);
    alert("Failed to edit resume");
  } finally {
    setResumeLoading(false);
  }
};

const deleteResume = async (resumeId)=> {
  const confirm = window.confirm("Are Your Sure you want to delete this resume?");
  if(confirm){
    setAllResumes(prev => prev.filter(resume => resume._id !== resumeId));
  }
}

  return (
  <div>
  <div className='max-w-7xl mx-auto px-4 py-8'>

    <p className=' font-medium mb-6 bg-gradient-to-r from-slate-600  to-slate-700 bg-clip-text text-transparent'>
      {!isLoading ?  (`Hi ${user?.name}`) : "Loading"}
      </p>

    <div className='flex gap-4'>
      <button onClick={()=>setShowCreateResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
        <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full'/>
        <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
      </button>
    </div>

    <hr className='border-slate-300 my-6 sm:w-[305px]'/>
    
    <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
      {
        !isLoading ? (
          allResumes.length != 0 ? (
            allResumes.map((resume,index)=>{
          const baseColor = colors[index % colors.length];
          return (
            <button onClick={()=>{navigate(`/app/builder/${resume._id}`)}} key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background: `linear-gradient(135deg, 
            ${baseColor}10, ${baseColor}40)`,borderColor: baseColor + '40'}}>

              <FilePenLineIcon  className='size-7 group-hover:scale-105 transition-all' style={{color:baseColor}}/>
              <p className='tex-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:baseColor}}>{resume.title}</p>
              <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover-text-slate-500 transition-all duration-300 px-2 text-center' style={{color: baseColor + '90'}}>Updated On {new Date(resume.updatedAt).toLocaleDateString()}</p>
              <div onClick={e=>e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                <TrashIcon onClick={()=>{deleteResume(resume._id); }} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
                <PencilIcon onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors'/>
              </div>
            </button>
          )
        })
          ) : (<div><h3 className="text-1xl font-medium mb-6 bg-gradient-to-r from-slate-600  to-slate-700 bg-clip-text text-transparent">No Resumes Found ... "Click Create Resume To Add"</h3></div>)
        ) : ("Loading...")
      }
    </div>
  
  

    {showCreateResume  && (
      <form onSubmit={createResume} onClick={()=>{setShowCreateResume(false)}} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>  
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
            <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
            {!isLoading ? 
            <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
          : <Loader />  
          }
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setShowCreateResume(false); setTitle('')}}></XIcon>
          </div>
      </form>
)
}


    {editResumeId  && (
      <form  onClick={()=>{setEditResumeId('')}} className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center'>  
          <div onClick={e=>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'>
            <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
            <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Enter resume title' className='w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600' required/>
            <button onClick={editTitle} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>{setEditResumeId(''); setTitle('')}}></XIcon>
          </div>
      </form>
)
}

    </div>

  </div>
  )
}

export default Dashboard;