import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const jobCategories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Data Scientist",
    "ML Engineer",
    "UI/UX Designer",
    "Product Designer",
    "Graphic Designer",
    "Software Engineer",
    "AI/ML Researcher",
    "Web Developer",
    "QA/Test Engineer",
    "Cloud Engineer",
    "Blockchain Developer",
    "Game Developer",
    "AR/VR Developer",
    "Technical Writer",
    "Business Analyst",
    "Product Manager",
    "Project Manager",
    "Database Administrator",
    "System Administrator",
    "IT Support Specialist",
    "Salesforce Developer",
    "SEO Specialist",
    "Marketing Intern",
    "Content Writer",
    "Finance Analyst",
    "Operations Manager"
];

export const CategoryCaraousel = () => {

    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;

     const searchJobHandler = (query) => {
            dispatch(setSearchedQuery(query));
            navigate("/browse") ;
        }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-8">
                <CarouselContent>
                    {
                        jobCategories.map((cat, ind) => {
                            return (
                                
                                <CarouselItem key = {ind} className="px-5 md:basis-1/2 lg:basis-1/3">
                                    <Button onClick = {() => {searchJobHandler(cat)}}  className= "w-full text-sm rounded-full whitespace-nowrap"> {cat} </Button>
                                </CarouselItem>
                            );
                        })
                    }
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    )
}
