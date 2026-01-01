import { Plus, Sparkles, ToolCaseIcon, Trash2 } from 'lucide-react';
import React from 'react';

const ProjectsForm = ({data,onChange}) => {


    const addProject = ()=>{
            const newProject = {
                name: "",
                type: "",
                description: "",
            }
            onChange([...data, newProject]);

    }

    const RemoveProject = (index)=> {
        const updated = data.filter((_,i)=> i !== index);
        onChange(updated);
    }

    const updateProject = (index,field,value)=> {
        const updated = [...data];
        updated[index] = {...updated[index] , [field]: value}
        onChange(updated)
    }


    return (
        <div>
             <div>
            <div className='space-y-6 min-h-[500px]'>
                                        <div className='flex items-center justify-between'>
                                            <div >
                                                <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Projects Gallary</h3>
                                                <p className='text-sm text-gray-500'>Add Projects Details</p>
                                            </div>
                                            <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors'>
                                                <Plus className='size-4'/>
                                                Add Project
                                            </button>
            </div>
                    {data.length === 0 ? 
                    (<div className='text-center py-8 text-gray-500'>
                        <ToolCaseIcon className="w-12 h-12 mx-auto mb-3 text-gray-300"/>
                        <p>Mo Projects Added yet.</p>
                        <p className='text-sm'>Click "Add Project to get started."</p>
                    </div>) : 
                    
                    (<div className='space-y-4'>
            
                        {data.map((project,index)=>(
                            <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                                <div className='flex justigy-between items-start'>
                                    <h4>Project #{index + 1}</h4>
                                    <button onClick={()=>RemoveProject(index)} className='text-red-500 hoverLtext-red-700 transition-colors'>
                                        <Trash2 className="size-4"/>
                                    </button>
                                </div>
            
                                <div className='grid md:grid-cols-2 gap-3'>
                                    <input type="text" placeholder='Project Name' value={project.name || ""} onChange={(e)=>{updateProject(index,"name",e.target.value)}} className='px-3 py-2 text-sm'/>
                                    <input type="text" placeholder="Project Type" value={project.type || ""} onChange={(e)=>{updateProject(index,"type",e.target.value)}} className='px-3 py-2 text-sm'/>
                                </div>
                                                      <div className='space-y-2'>
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">Project description</label>
                            <button className='flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-700  hover:text-purple-100 transition-colors disabled:opacity-50'>
                                <Sparkles className='w-3 h-3'/>
                                Enhance With AI
                            </button>
                        </div>
                        <textarea onChange={(e)=>updateProject(index,"description", e.target.value)} value={project.description || ""} rows={4} className='w-full text-sm px-3 py-2 rounded-lg resize-none' placeholder='Descripe your Project.'></textarea>
                    </div>
                            </div>
                        ))}
            
                    </div>)
                    }
                    </div>  
        </div>
        </div>
    );
}

export default ProjectsForm;