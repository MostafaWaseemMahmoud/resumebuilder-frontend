import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react';
import React from 'react';

const PersonalInfoForm = ({data, onChange, removeBackground,setRemoveBackground}) => {
    const handleChange = (field,value)=> {
            onChange({...data, [field]: value})
    }


    const fields = [
        {key:"full_name" , label: "Full Name" , icon: User, type: "text", required:true},
        {key:"email" , label: "Email Address" , icon: Mail, type: "email", required:true},
        {key:"phohne" , label: "Phone Number" , icon: Phone, type: "tel"},
        {key:"location" , label: "Location" , icon: MapPin, type: "text"},
        {key:"profession" , label: "Profession" , icon: BriefcaseBusiness, type: "text"},
        {key:"linkedin" , label: "LinkedIn Profile" , icon: Linkedin, type: "url"},
        {key:"website" , label: "Personal Website" , icon: Globe, type: "url"},
    ]
    
    return (
        <div>
            <h3  className='text-lg font-semibold text-gray-900'>Personal Information</h3>
            <p className='text-sm text-gray-600'>Get Started With The Personal Information</p>
                {fields.map((field)=>{
                    const Icon = field.icon;
                    return (
                        <div id={field.key} className='space-y-1 mt-5'>
                            <label className="flex items-center gap-2 text-sm font-meduim text-gray-600">
                                <Icon className='size-4'/>
                                {field.label}
                                {field.required && <span className='text-red-500'>*</span>}
                            </label>
                            <input type={field.type} value={data[field.key] || ""} onChange={(e)=>{handleChange(field.key,e.target.value)}} className='mt-1 w-full px-3 py-2 border border-grray-300 rounded-lg focus:ring focus:ring-blue-500 outline-none transition-colors text-sm' placeholder={`Enter Your ${field.label.toLowerCase()}`}required={field.required}/>
                        </div>
                    )
                })}

        </div>
    );
}

export default PersonalInfoForm;