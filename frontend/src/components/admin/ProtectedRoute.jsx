import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);

    useNavigate(() => {
        if (user === null || user != 'Recruiter') {
            navigate('/');
        }
    }, []);
    return (
        <>
            {children}
        </>
    )

}
