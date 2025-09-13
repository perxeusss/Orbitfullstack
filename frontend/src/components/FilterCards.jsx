import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'


const filterData = [
  {
    filterType: "LOCATION",
    array: [
      "Bangalore",
      "Hyderabad",
      "Delhi",
      "Mumbai",
      "Chennai",
      "Pune",
      "Remote"
    ]
  },
  {
    filterType: "INDUSTRY",
    array: [
      "Software Development",
      "Data Science",
      "Artificial Intelligence",
      "Cybersecurity",
      "Product Management",
      "UI/UX Design",
      "DevOps",
      "Quality Assurance"
    ]
  },
  {
    filterType: "SALARY",
    array: [
      "0-5 LPA",
      "5-10 LPA",
      "10-15 LPA",
      "15-20 LPA",
      "20+ LPA"
    ]
  },
  {
    filterType: "EXPERIENCE",
    array: [
      "Fresher",
      "0-1 Years",
      "1-3 Years",
      "3-5 Years",
      "5+ Years"
    ]
  },
  {
    filterType: "JOB TYPE",
    array: [
      "Full Time",
      "Part Time",
      "Internship",
      "Contract",
      "Freelance"
    ]
  }
]


export const FilterCards = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch() ;

  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue)) ;
  }, [selectedValue]) ;

  return (
    <div>
      <h1 className='font-bold text-xl'> Filter Jobs </h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => {
            return (
              <div>
                <h1 className='font-medium text-l my-4'> {data.filterType}</h1>
                <div className='flex w-60 my-4'>
                  <Input className="text-sm h-7 border border-gray-200 rounded-lg shadow-gray-200"
                    placeholder={`Search ${data.filterType.toLowerCase()}...`} />
                  <Button className="h-6 ounded-r-full rounded-r-full text-gray-400" variant="ghost">
                    <Search />
                  </Button>
                </div>
                {
                  data.array.map((item, id) => {
                    const itemId = `r${index} - ${id}`
                    return (
                      <div className='flex text-sm font-light text-gray-500 items-center space-x-2 my-2'>
                        <RadioGroupItem value={item} id={itemId} />
                        <Label htmlFor={itemId}>{item}</Label>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </RadioGroup>
    </div>
  )
}
