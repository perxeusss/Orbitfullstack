import { useEffect } from 'react'
import { JOB_API_END_POINT } from '@/utils/constants'
import { useDispatch } from 'react-redux'
import { setAllAdminJobs } from '@/redux/jobSlice';
import axios from "axios" ;
import { toast } from 'sonner';

export const useGetAllAdminJobs = () => {
  

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                     console.log("Fetched jobs:", res.data);
                    dispatch(setAllAdminJobs(res.data.jobs));

                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchAllAdminJobs() ;
    }, []) ;
}
