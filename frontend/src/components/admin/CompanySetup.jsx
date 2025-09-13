import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { COMPANY_API_END_POINT } from '@/utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useGetCompanyById } from '@/hook/useGetCompanyById'

export const CompanySetup = () => {

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const params = useParams();
  useGetCompanyById(params.id) ;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
      console.log(input);
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    })
  }, [singleCompany])

  return (
    <div>
      <NavBar />
      <div className='max-w-xl mx-auto my-10'>
        <div className='flex items-center gap-68 my-5 mx-auto '>
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>
            <ArrowLeft />
            <span >Back</span>
          </Button>
          <h1 className='text-lg font-medium'>Company Setup</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-68 my-5 mx-auto '>
          </div>
          <div className='text-lg font-medium text-gray-700'>
            <div className='grid grid-cols-2 my-3'>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler} />
            </div>
            <div className='grid grid-cols-2 my-3'>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler} />
            </div>
            <div className='grid grid-cols-2 my-3'>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler} />
            </div>
            <div className='grid grid-cols-2 my-3'>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler} />
            </div>
            <div className='grid grid-cols-2 my-3'>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler} />
            </div>
          </div>
          {
            loading ?
              (
                <Button disabled className="w-full bg-[#cc1212] hover:bg-[#030101]"> <Loader2 className=" h-4 w-4 animate-spin" /> Please wait</Button>
              )
              :
              (
                <Button type="submit" className="w-full bg-[#cc1212] hover:bg-[#030101]">Update</Button>
              )
          }
        </form>
      </div>
    </div>
  )
}
