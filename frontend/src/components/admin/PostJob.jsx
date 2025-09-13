import React, { useState } from 'react'
import NavBar from '../shared/NavBar'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { Form, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constants'
import { toast } from 'sonner'

export const PostJob = () => {

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: "",
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeSelectHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany?._id });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        
        try {
            console.log(input);
            setLoading(true);

            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    "Content-Type": `application/json`
                },
                withCredentials: true
            });
            
            if (res?.data?.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        finally {
           setLoading(false);
        }

    }
    const { companies } = useSelector(store => store.company);

    return (
        <div>
            <NavBar />
            <div className='flex items-center justify-center w-screen my-5'>'
                <Form onSubmit={submitHandler} className='max-w-4xl p-8 my-10 border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Job Type </Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        <div>
                            <Label> No of Position </Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>
                        {
                            companies.length && (
                                <Select onValueChange={changeSelectHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem key={company._id} value={company?.name?.toLowerCase()} className='cursor-pointer'>
                                                            {company?.name}
                                                        </SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ?
                            (
                                <Button disabled className="w-full bg-[#cc1212] hover:bg-[#030101]"> <Loader2 className=" h-4 w-4 animate-spin" /> Please wait</Button>
                            )
                            :
                            (
                                <Button type="submit" className="w-full bg-[#cc1212] hover:bg-[#030101]">Post New Job</Button>
                            )
                    }
                    {
                        companies.length === 0 && <p className='text-xs font-bold text-center my-3'><span className='text-red-600'>*</span>Please register a company, before posting a job.</p>
                    }
                </Form>
            </div>
        </div>
    )
}

