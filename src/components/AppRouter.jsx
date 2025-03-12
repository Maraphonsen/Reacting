import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoutes, PrivateRoutes } from '../router/Routers';
import Error from '../pages/Error';
import { AuthContext } from '../context/Context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <Loader />;
    }

    return (
        isAuth
            ? (
                <Routes>
                    {PrivateRoutes.map((route, index) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                    <Route path="/" element={<Navigate to="/posts" />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            )
            : (
                <Routes>
                    {PublicRoutes.map((route, index) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    ))}
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            )
    );
};

export default AppRouter;

