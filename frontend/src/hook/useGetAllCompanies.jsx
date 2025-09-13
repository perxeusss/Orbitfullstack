import { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { useDispatch } from 'react-redux'
import axios from "axios" ;
import { setCompanies } from '@/redux/companySlice';
import { toast } from 'sonner';

export const useGetAllCompanies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllCompanes = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                     console.log("Fetched jobs:", res.data);
                    dispatch(setCompanies(res.data.companies));

                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchAllCompanes() ;
    }, []) ;
}
