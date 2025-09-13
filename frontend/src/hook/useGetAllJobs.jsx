import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice';
import axios from "axios" ;
import { toast } from 'sonner';

export const useGetAllJobs = () => {

    const {searchedQuery} = useSelector(store => store.job) ; 

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                     console.log("Fetched jobs:", res.data.jobs);
                    dispatch(setAllJobs(res.data.jobs));

                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchAllJobs() ;
    }, []) ;
}
