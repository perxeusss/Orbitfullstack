import React, { useEffect } from 'react'
import NavBar from '../shared/NavBar'
import { ApplicantsTable } from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '@/redux/applicationSlice';

export const Applicants = () => {

  const parmas = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector(store => store.application);

  useEffect(() => {
    const fetchAllApplicatns = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${parmas.id}/applicants`, { withCredentials: true });

        if (res.data.success) {
          dispatch(setApplicants(res.data.job));
        }
      } catch (error) {
        console.log(error.response?.data || error.message);
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
    fetchAllApplicatns();
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <div className='max-w-7xl mx-auto'>
        <h1 className='font-bold text-xl my-10 mx-auto'>Applicants ({applicants?.applications?.length}) </h1>
        <ApplicantsTable />
      </div>
    </div>
  )
}
