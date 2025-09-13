import React, { useEffect, useState } from 'react'
import { Table,TableCaption,TableHead,TableHeader,TableBody, TableRow, TableCell,} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export const CompaniesTable = () => {
  
    const {companies} = useSelector(store => store.company) || [] ;
    const {searchCompanyByText} =  useSelector(store => store.company) || "" ;
    
    const [filterCompany , setfilterCompany] = useState(companies) ;
    const navigate = useNavigate() ;
    
    useEffect(()=>{
        const filteredCompany = companies.length >= 0 && companies.filter((company)=>{
            if(!searchCompanyByText){
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setfilterCompany(filteredCompany);
    },[companies,searchCompanyByText])

     if (companies.length === 0) {
        return (
            <div className="p-4 text-center text-gray-600">
                You haven't registered any companies yet.
            </div>
        )
    }

    return (
        <Table>
            <TableCaption>A List of Recent Registered Companies</TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {filterCompany.map(company => (
                    <TableRow key={company._id}>
                        <TableCell>
                            <Avatar>
                                <AvatarImage
                                    src={company.logo || '/placeholder.png'}
                                    alt={`${company.name} logo`}
                                    className="w-8 h-8 rounded-full"
                                />
                            </Avatar>
                        </TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className="w-32">
                                    <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => navigate(`/admin/companies/${company._id}`)}>
                                        <Edit2 />
                                        <span>Edit</span>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
