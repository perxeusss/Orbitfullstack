import React, {useState } from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '@radix-ui/react-label'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

export const CreateCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  const [companyName, setCompanyName] = useState('');
 

  const registerNewCompany = async () => {
     if (!companyName.trim()) {
    toast.error("Please enter a company name.");
    return;
  }
    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName},
        {
          headers: {
            "Content-Type": "application/json"
          },
          withCredentials: true
        });
        console.log(res?.data?.success) ;
      if (res?.data?.success) {
        dispatch(setSingleCompany(res?.data?.company)) ;
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
      
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div>
      <NavBar />
      <div className='max-w-4xl mx-auto'>
        <div className='my-10'>
          <h1 className='text-2xl font-bold'> Your Company Name </h1>
          <p className='text-gray-500 my-2'>What should we call your company? Don't worry, you can change it later!</p>
        </div>
        <Label> Company Name </Label>
        <Input
          type="text"
          name = "companyName"
          className="my-2"
          placeholder="Google, Rubrik, Meta, etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className='flex items-center gap-2 my-7 justify-end'>
          <Button variant="outline" onClick={() => navigate("/admin/companies")} >Cancel</Button>
          <Button className="bg-[#cc1212] hover:bg-[#030101]" onClick = {registerNewCompany} >Continue</Button>
        </div>
      </div>
    </div>
  )
}
