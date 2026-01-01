import { Sparkle, Sparkles } from 'lucide-react';
import React from 'react';

const ProfessionalSummaryForm = ({data,onChange,setResumeData})=> {
    return (
        <div className='space-y-4 min-h-[500px]'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Summary</h3>
                    <p className='text-sm text-gray-500'>Add Summary for Your Resume Here</p>
                </div>
            </div>

            <div className='mt-6'>
                <textarea rows={7} value={data || ""} onChange={(event)=>{onChange(event.target.value)}} className='w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus-ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none' placeholder='write a compelling professoinal summary hughlights your key strengths and career abjectives'></textarea>
                <p className='text-xs text-gray-500  mx-auto '>Tip: Keep it concise (3-4 sentences) and focus on your most relavant achevments and skills.</p>
            </div>

        </div>
    );
}

export default ProfessionalSummaryForm;