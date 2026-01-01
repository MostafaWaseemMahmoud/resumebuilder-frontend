import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dummyResumeData } from '../assets/assets';
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Loader,
  Share2Icon,
  Sparkles,
  User,
} from 'lucide-react';

import axios from 'axios'

import PersonalInfoForm from '../Components/PersonalInfoForm';
import ResumePreview from '../Components/ResumePreview';
import TemplateSelector from '../Components/TemplateSelector';
import ColorPicker from '../Components/ColorPicker';
import ProfessionalSummaryForm from '../Components/ProfessionalSummaryForm';
import ExperienceForm from '../Components/ExperienceForm';
import EducationForm from '../Components/EducationForm';
import ProjectsForm from '../Components/ProjectsForm';
import SkillsFrom from '../Components/SkillsFrom';
import { apiUrl } from '../app/store';

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    professional_summary: '',
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '3B82F6',
    Public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemovebackground] = useState(false);
  const [isSaving,setIsSaving]  = useState(false)
  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ];




  const LoadExistingResume = async () => {
     try {
    setIsSaving(true);
    const token = window.localStorage.getItem('token')
    console.log(resumeId);

        // 1️⃣ Get current resume data
        const res = await axios.get(
          `${apiUrl}api/resumes/get/${resumeId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );


        const title = res.data.resume[0].title

        const TheResume = {
          _id: resumeId,
          title: title,
          personal_info: res.data.resume[0].personal_info,
          professional_summary: res.data.resume[0].professional_summary,
          experience: res.data.resume[0].experience,
          education: res.data.resume[0].education,
          project: res.data.resume[0].project,
          skills: res.data.resume[0].skills,
          template: res.data.resume[0].template,
          accent_color: res.data.resume[0].accent_color,
          Public: res.data.resume[0].Public,
        removebackground: false,
        }

        setResumeData(TheResume)
  } catch (err) {
    console.error(err);
    alert("Failed to get resume Data");
  } finally {
    setIsSaving(false);
  }
  };

  useEffect(() => {
    LoadExistingResume();
  }, []);

  const changeResumeVisibility = async ()=> {
    setResumeData({...resumeData,Public: !resumeData.Public})
  }

let isSharing = false;

const handleShare = async () => {
  if (isSharing) return; // ⛔ prevent double call
  isSharing = true;

  const resumeUrl = `${window.location.origin}/view/${resumeId}`;

  try {
    if (navigator.share) {
      await navigator.share({
        title: "My Resume",
        text: "Check out my resume",
        url: resumeUrl,
      });
    } else {
      await navigator.clipboard.writeText(resumeUrl);
      alert("Link copied to clipboard!");
    }
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Share failed:", err);
    }
  } finally {
    isSharing = false; // 🔓 unlock
  }
};



  const downloadResume = ()=>{
    window.print();
  }

const handelSaveResume = async () => {
  try {
    setIsSaving(true);


    const token = window.localStorage.getItem('token')
    console.log(resumeId);

        // 1️⃣ Get current resume data
        const res = await axios.get(
          `${apiUrl}api/resumes/get/${resumeId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
    
         const title = res.data.resume[0].title   // Get The Title
        console.log(title)
        console.log(res.data.resume)
        console.log(res.data.resume.title)

    await axios.put(
      `${apiUrl}api/resumes/update`,
      {
        resumeId: resumeId,
        resumeData: {
          _id: resumeId,
          title: title,
          Public: resumeData.Public,
          personal_info: resumeData.personal_info,
          professional_summary: resumeData.professional_summary,
          experience: resumeData.experience,
          education: resumeData.education,
          project: resumeData.project,
          skills: resumeData.skills,
          template: resumeData.template,
          accent_color: resumeData.accent_color,
          public: resumeData.Public,
        },
        removebackground: false,
      },
      {
        headers: {
          authorization: `${token}`,
        },
      }
    );

    alert("Resume updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to edit resume");
  } finally {
    setIsSaving(false);
  }
};


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to="/app"
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashbord
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

              {/* 🔥 Progress Bar (Modified Part Only) */}
              <div className="relative h-1 mb-4">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      (activeSectionIndex /
                        (sections.length - 1)) *
                      100
                    }%`,
                  }}
                />
              </div>

              {/* Section Navigation */}
              <div className="z-10 flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({
                        ...prev,
                        template,
                      }))
                    }
                  />
                  <ColorPicker
                    selectedcolor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center">
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prev) =>
                          Math.max(prev - 1, 0)
                        )
                      }
                      className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" />
                      Previous
                    </button>
                  )}

                  <button
                    onClick={() =>
                      setActiveSectionIndex((prev) =>
                        Math.min(
                          prev + 1,
                          sections.length - 1
                        )
                      )
                    }
                    className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${
                      activeSectionIndex ===
                        sections.length - 1 &&
                      'opacity-50'
                    }`}
                    disabled={
                      activeSectionIndex ===
                      sections.length - 1
                    }
                  >
                    Next
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {sections[activeSectionIndex].id ===
                  'personal' && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemovebackground}
                  />
                )}
                
                {sections[activeSectionIndex].id ===
                  'summary' && (
                  <ProfessionalSummaryForm
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {sections[activeSectionIndex].id ===
                  'experience' && (
                  <ExperienceForm
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        experience: data,
                      }))
                    }
                  />
                )}

                {sections[activeSectionIndex].id ===
                  'education' && (
                  <EducationForm
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        education: data,
                      }))
                    }
                  />
                )}
                {sections[activeSectionIndex].id ===
                  'projects' && (
                  <ProjectsForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        project: data,
                      }))
                    }
                  />
                )}

                {sections[activeSectionIndex].id ===
                  'skills' && (
                  <SkillsFrom
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        skills: data,
                      }))
                    }
                  />
                )}
              </div>
              {!isSaving ? 
              (              <button onClick={handelSaveResume}className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                Save Changes
              </button>) : <div className='bg-gradient-to-br flex align-center justify-center  from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm'><Loader></Loader></div>
              }

            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-7 max-lg:mt-6">
                <div className='relative w-full'>
                  <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                     {
                      resumeData.Public && (
                        <button onClick={handleShare} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors '>
                          <Share2Icon className='size-4'/>
                        </button>
                      )
                     }
                     <button onClick={changeResumeVisibility} className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-purple-100 to-purple-200 text-purple-600 ring-purple-300 rounded-lg hover:ring transition-colors'>
                      {resumeData.Public ? <EyeIcon className='size-4'/> : <EyeOffIcon className='size-4'/>}
                      {resumeData.Public ? "Public" : "Private"}
                     </button>
                     <button onClick={downloadResume}className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
                      <DownloadIcon className='size-4'/> Download
                     </button>
                  </div>
                </div>

            <ResumePreview
              data={resumeData}
              accentColor={resumeData.accent_color}
              template={resumeData.template}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
