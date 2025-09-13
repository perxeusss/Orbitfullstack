import React, { useEffect } from 'react'
import NavBar from './shared/NavBar'
import { JobCard } from './JobCard';
import { FilterCards } from './FilterCards';
import { Footer } from './shared/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useGetAllJobs } from '@/hook/useGetAllJobs';
import { motion } from 'framer-motion';

export const Browse = () => {

  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  }, []);

  return (
    <div>
      <NavBar />

      <div className='max-w-7xl gap-5 flex'>
        <div className='mx-9'>
          <FilterCards />
        </div>

        <div className='mx-5 w-30% h-1/2'>
          <h1 className='text-xl font-bold my-10'>
            Search Results ({allJobs.length})
          </h1>

          {allJobs.map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.05,
                ease: 'easeOut'
              }}
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
