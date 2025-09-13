import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constants';
import { toast } from 'sonner';

const shortListingStatus = ["Accepted", "Rejected"];

export const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application);

    console.log(applicants) ;

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => {
                            // Return the JSX for each item

                            console.log("item._id:", item?._id);
console.log("item.applicant._id:", item?.applicant?._id);
console.log("item.applicationId:", item?.applicationId);
                            return (
                                <TableRow key={item?._id}>
                                    <TableCell>{item?.applicant?.fullName} </TableCell>
                                    <TableCell>{item?.applicant?.email}  </TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber} </TableCell>
                                    <TableCell >
                                        {
                                            item?.applicant?.profile?.resume ? <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 cursor-pointer">{item?.applicant?.resumeOriginalName} </a> :
                                                <p>NA</p>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.applicant?.createdAt.split("T")[0]} </TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                                <PopoverContent className="w-32">
                                                    {
                                                        shortListingStatus.map((status, index) => {
                                                            return (
                                                                <div onClick = {() => statusHandler(status, item?._id)} key={index} className='flex items-center cursor-pointer my-2 w-fit'>
                                                                    <span>{status}</span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </PopoverContent>
                                            </PopoverTrigger>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}
