import React from 'react'
import { FcApproval } from "react-icons/fc";

const SecondPage = () => {
  return (
    <div className="m-5 bg-slate-50 h-[110vh] rounded-xl max-sm:h-[170vh]">
        <div className="flex items-center justify-evenly max-sm:flex-col-reverse">
            <div className="w-[50%] p-5 max-lg:w-[80%]">
                <h1 className="text-4xl font-bold py-3 text-blue-700">
                    Why to choose our platform ?
                </h1>
                <ul className="mt-5 font-semibold">
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Personalized Attention</li>
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Experienced Tutors</li>
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Customized Learning Plans</li>
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Interactive Learning Environment</li>
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Flexible Scheduling</li>
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Affordable Pricing</li>
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Comprehensive Study Materials</li>
                    <li className="h-15 bg-gray-600 text-start p-3 px-5 mt-3 rounded-lg text-slate-50 flex items-center gap-2"><FcApproval size={20}/> Supportive Community</li>
                </ul>
            </div>
            <div className="">
                <img src="./tutor.jpeg" alt="Poster" className='h-[80vh] my-12 max-sm:h-[50vh]'/>
            </div>
        </div>
    </div>
  )
}

export default SecondPage