
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, roles }) => {

    const { isAuthenticated, userRole, user } = useSelector(state => state.authState);
    console.log("userRole:", isAuthenticated, roles?.length > 0, roles?.some(data => data !== userRole), roles, userRole)
    console.log("isAuthenticated:", roles?.includes(user?.role), user?.role, roles);



    // Check if the user is authenticated
    if (!isAuthenticated) {
        console.log("Check if the user is authenticated::  isAuthenticated:", isAuthenticated);
        return window.location.replace('/login');
    }

    // Check if the user role is included in the allowed roles
    if (roles?.length > 0 && !roles?.includes(user?.role)) {
        return (
            <>
                <div>
                    <h1 className='text-center'> Sorry! Unauthorized User! You don't have a premission to access this Path  </h1>
                </div>
            </>
        );
    }

    return children;
};
