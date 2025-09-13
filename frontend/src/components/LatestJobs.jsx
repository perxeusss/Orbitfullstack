import React from 'react'
import { LatestJobCards } from './LatestJobCards';
import { useSelector } from 'react-redux';

export const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job || {});
    console.log(allJobs) ;
   
    return (
        <div className="mx-20 my-20">
            <h1 className='text-4xl text-[#030101] font-bold'>
                Latest Jobs <span className='text-[#cc1212]'> Hiring Now </span></h1>

            {/* cards */}

            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    Array.isArray(allJobs) && allJobs.length > 0
                        ? allJobs.slice(0, 6).map((job) => <LatestJobCards key = {job?._id} job = {job} />)
                        : <p className='text-gray-700 font-medium text-xl'>Currently there are no latest jobs available.</p>
                }
            </div>

        </div>
    )
}
