import { useEffect } from 'react'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { useDispatch } from 'react-redux'
import axios from "axios" ;
import { setSingleCompany } from '@/redux/companySlice';
import { toast } from 'sonner';

export const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    console.log("Fetched jobs:", res.data.jobs);
                    dispatch(setSingleCompany(res.data.company));

                }
            } catch (error) {
                console.log(error.response?.data || error.message);
                toast.error(error.response?.data?.message || "Something went wrong");
            }
        }
        fetchSingleCompany() ;
    }, [companyId, dispatch]) ;
}
