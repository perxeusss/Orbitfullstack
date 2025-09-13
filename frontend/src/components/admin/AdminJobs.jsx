import React, { useEffect, useState } from 'react'
import NavBar from '../shared/NavBar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AdminsJobTable } from './AdminsJobTable'
import { useGetAllAdminJobs } from '@/hook/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

export const AdminJobs = () => {

  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input])

  return (
    <div>
      <NavBar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input className="w-fit" placeholder="Filter by name / role" onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate("/admin/jobs/create")} className="bg-[#cc1212] hover:bg-[#030101]"> New Job </Button>
        </div>
        <AdminsJobTable />
      </div>
    </div>
  )
}
