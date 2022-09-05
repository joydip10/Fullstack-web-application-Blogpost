import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import useAuth from './../../Hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    let { user, loading } = useAuth();
    const location = useLocation();

    if (loading === true) {
        return <div style={{ marginTop:'20%', display: 'flex', justifyContent: 'center', justifyItems: 'center', alignContent: 'center', alignItems: 'çenter' }}>
            <CircularProgress />
        </div>
    }
    else {
        if (user?.email) {
            return children;
        }
        else {
            return <Navigate to="/login" state={{ from: location }} />;
        }
    }

};

export default PrivateRoute;