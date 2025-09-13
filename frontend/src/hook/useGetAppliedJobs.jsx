import { setAllAppliedJobs } from '@/redux/jobSlice'
import { APPLICATION_API_END_POINT } from '@/utils/constants'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useGetAppliedJobs = () => {

    const dispatch = useDispatch();
    useEffect(() => {

        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, { withCredentials: true });

                console.log("Fetched jobs:", res.data.application);
                dispatch(setAllAppliedJobs(res.data.application));
                if (res.data.success) {
                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                // toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchAppliedJobs() ;
    }, []);
}
