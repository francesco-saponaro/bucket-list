import { useLocation, Navigate } from "react-router-dom";
import ROUTES from '@routes/constants';
import { motion } from "framer-motion";
import { useAuthStore } from '@store/storeAuth';
// import { storeDevice } from "@store/storeDevice";

interface PublicRouteProps {
    RouteComponent: React.ComponentType<any>;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ RouteComponent }) => {
    const location = useLocation();
    const { user } = useAuthStore();
    // const { device } = storeDevice();

    if (user != null) {
        return <Navigate to={ROUTES.SELECT} state={{ from: location }} />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0, transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                }
            }}
            transition={{
                duration: 0.2,
                ease: "easeInOut",
            }}
            key={location.pathname}
        >
            <RouteComponent />
        </motion.div>
    );
};

export default PublicRoute;