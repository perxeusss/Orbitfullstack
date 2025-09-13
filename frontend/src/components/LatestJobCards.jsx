import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

export const LatestJobCards = ({job}) => {
    const navigate = useNavigate() ;

    return (

        <div onClick = {() => navigate(`/description/${job?._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer'>
            <div>
                <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                <p className='text-l text-gray-600'>{job?.location}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg '>{job.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-3'>
                <Badge className = "font-bold text-[#cc1212]" variant = "ghost">{job?.position} Positions</Badge>
                <Badge className = "font-bold text-[#220c9d]" variant = "ghost">{job?.jobType}</Badge>
                <Badge className = "font-bold text-[#027512]" variant = "ghost" >{job?.salary} </Badge>
            </div>
        </div>
    )
}
