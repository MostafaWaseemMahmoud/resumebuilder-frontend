import { Briefcase, Plus, Sparkles, Trash2 } from 'lucide-react';
import React from 'react';

function ExperienceForm({data,onChange}) {

    const addExprience = ()=>{
            const newExperience = {
                company: "",
                position: "",
                start_date: "",
                end_data: "",
                description: "",
                is_current:false
            }
            onChange([...data, newExperience]);

    }

    const RemoveExprience = (index)=> {
        const updated = data.filter((_,i)=> i !== index);
        onChange(updated);
    }

    const updateExpreince = (index,field,value)=> {
        const updated = [...data];
        updated[index] = {...updated[index] , [field]: value}
        onChange(updated)
    }

    return (
        <div className='space-y-6 min-h-[500px]'>
                            <div className='flex items-center justify-between'>
                                <div >
                                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                                    <p className='text-sm text-gray-500'>Add your job experience</p>
                                </div>
                                <button onClick={addExprience} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'>
                                    <Plus className='size-4'/>
                                    Add Experience
                                </button>
</div>
        {data.length === 0 ? 
        (<div className='text-center py-8 text-gray-500'>
            <Briefcase  className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
            <p>No work Experience addded yet.</p>
            <p className='text-sm'>Click "Add Experience to get started."</p>
        </div>) : 
        
        (<div className='space-y-4'>

            {data.map((experience,index)=>(
                <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                    <div className='flex justigy-between items-start'>
                        <h4>Experience #{index + 1}</h4>
                        <button onClick={()=>RemoveExprience(index)} className='text-red-500 hoverLtext-red-700 transition-colors'>
                            <Trash2 className="size-4"/>
                        </button>
                    </div>

                    <div className='grid md:grid-cols-2 gap-3'>
                        <input type="text" placeholder='company Name' value={experience.company || ""} onChange={(e)=>{updateExpreince(index,"company",e.target.value)}} className='px-3 py-2 text-sm rounded-lg'/>
                        <input type="text" placeholder='Job Title' value={experience.position || ""} onChange={(e)=>{updateExpreince(index,"position",e.target.value)}} className='px-3 py-2 text-sm rounded-lg'/>
                        <input type="month" value={experience.start_date || ""} onChange={(e)=>{updateExpreince(index,"start_date",e.target.value)}} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100'/>
                        <input type="month" value={experience.end_date || ""} onChange={(e)=>{updateExpreince(index,"end_date",e.target.value)}} className='px-3 py-2 text-sm rounded-lg disabled:bg-gray-100' disabled={experience.is_current}/>
                    </div>
                    <label>
                        <input type="checkbox" checked={experience.is_current || false} onChange={(e)=>{updateExpreince(index, "is_current", e.target.checked ? true : false); }} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'/>
                        <span className='text-sm text-gray-700'>Currently Working Here</span>
                    </label>
                    <div className='space-y-2'>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Job description</label>
                            <button className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-700  hover:text-purple-100 transition-colors disabled:opacity-50'>
                                <Sparkles className='w-3 h-3'/>
                                Enhance With AI
                            </button>
                        </div>
                        <textarea onChange={(e)=>updateExpreince(index,"description", e.target.value)} value={experience.description || ""} rows={4} className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Descripe your key responsibilities and achievments'></textarea>
                    </div>
                </div>
            ))}

        </div>)
        }
        </div>  
    );
}

export default ExperienceForm;