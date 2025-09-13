import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate() ;

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse") ;
    }

    return (
        <div className='text-center'>

            <div className='flex items-center flex-col gap-6 my-6'>
                <span className='px-4 my-2 rounded-full bg-gray-100 text-[#cc1212] font-medium '>
                    Your Career,
                    <span className='text-[#030101]'> Your Trajectory </span>
                </span>
                <h1 className='text-5xl font-bold text-[#030101] '> Search, Apply & <br /> Get your
                    <span className='text-[#cc1212] '> Dream Job </span>
                </h1>
                <p className="my-1 text-gray-600 max-w-xl mx-auto">
                    Discover opportunities, connect with top companies, and take the next big leap in your career with Orbit.
                </p>
                <div className=' flex border w-[40%] border-gray-200 rounded-full shadow-lg items-center mx-auto gap-3'>
                    <input
                        type="text"
                        placeholder='Find your dream job'
                        onChange={(e) => { setQuery(e.target.value) }}
                        className='outline-none border-none w-full p-1'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full">
                        <Search />
                    </Button>
                </div>
            </div>
        </div>
    )
}
