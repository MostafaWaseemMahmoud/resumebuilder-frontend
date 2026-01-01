import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {dummyResumeData} from '../assets/assets'
import ResumePreview from '../Components/ResumePreview';
import { ArrowLeftIcon, Loader } from 'lucide-react';
import { apiUrl } from '../app/store';
import axios from 'axios';

const Preview = ()=> {
  const { resumeId } = useParams();
    const [isLoading,setIsLoading] = useState(true);
  const [resumeData,setResumeData] = useState(null);
  const [isPublic , setIsPublic] = useState(false);

  
  const loadResume = async()=> {
    const token = window.localStorage.getItem('token')
     const res = await axios.get(
              `${apiUrl}api/resumes/get/${resumeId}`,
              {
                headers: {
                  authorization: `${token}`,
                },
              }
            );
            setResumeData(res.data.resume[0])

            if(res.data.resume[0].Public){
              setIsPublic(true)
            }
    setIsLoading(false)
  }

  useEffect(()=>{
    loadResume();
  },[])

  return resumeData ? (
  <div className='bg-slate-100'>
    <div className='max-w-3xl mx-auto py-10'>
      {isPublic
      ?
      (         <ResumePreview
                  data={resumeData}
                  accentColor={resumeData.accent_color}
                  template={resumeData.template}
                  />)
      :
      <div>        <p className='text-center text-6xl text-slate-400 font-medium'>This Resume Is Private</p>
</div>
      }

                  </div>
  </div>
  ) : (
    <div>
      {isLoading ? <Loader /> : 
      
      (<div className='flex flex-col items-center justify-center h-screen'>
        <p className='text-center text-6xl text-slate-400 font-medium'>Resume Not Found</p>
        <a href="/app" className='mt-6 bg-green-500 hover:bg-green-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'>
          <ArrowLeftIcon className='mr-2 size-4'/> go to home page
        </a>

      </div>)}
    </div>
      
  )
}

export default Preview;