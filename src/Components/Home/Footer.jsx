import React from 'react'

const Footer = ()=> {
    return (
 <>
            
            <footer className="flex flex-col md:flex-row gap-3 items-center justify-around w-full py-4 text-sm bg-slate-800 text-white/70">
                <p>Makes By Mostafa Waseem</p>
                <div className="flex items-center gap-4">
                    <a target='_blank' href="https://mstw-portofolio.netlify.app" className="hover:text-white transition-all">
                        Contact Us
                    </a>
                </div>
            </footer>
        </>
    )
}

export default Footer