import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

export const AppliedJobsTable = () => {
    const { allAppliedJobs = [] } = useSelector(store => store.job); // default to empty array
    

    return (
        <div className='my-8'>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/5">Date</TableHead>
                        <TableHead className="w-1/5">Job Role</TableHead>
                        <TableHead className="w-1/5">Company</TableHead>
                        <TableHead className="w-1/5">Salary</TableHead>
                        <TableHead className="w-1/5 text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length ? (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob?._id}>
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob?.job?.title}</TableCell>
                                    <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                                    <TableCell>{appliedJob?.job?.salary}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className = {`${appliedJob?.status === "accepted" ? "bg-green-400" : appliedJob?.status === "rejected" ? "bg-red-400" : "bg-black"}`}>{appliedJob?.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                                    You haven't applied for any job yet.
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}
