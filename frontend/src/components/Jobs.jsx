import React, { useEffect, useState } from 'react'
import NavBar from './shared/NavBar'
import { FilterCards } from './FilterCards'
import { JobCard } from './JobCard'
import { Footer } from './shared/Footer';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


export const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {

    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job?.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.location?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.role?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job?.jobType?.toLowerCase().includes(searchedQuery.toLowerCase())
        // job?.salary?.toLowerCase().includes(searchedQuery.toLowerCase())  ;
      })
      setFilterJobs(filteredJobs);
    }
    else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <NavBar />

      <div className='flex gap-5 max-w-7xl mt-5 mx-auto'>
        <div className='w-[20%]'>
          <FilterCards />
        </div>

        <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
          {
            Array.isArray(filterJobs) && filterJobs.length > 0 ? (
              <div className='grid grid-cols-3 gap-4'>
                {
                  filterJobs.map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                      <JobCard job={job} />
                    </motion.div>
                  ))
                }
              </div>
            ) : (
              <span>Jobs not found</span>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}
