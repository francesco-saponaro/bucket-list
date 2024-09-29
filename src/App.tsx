// import SplashLoader from '@common/Splash';
// import * as Sentry from "@sentry/react";
import useAuth from '@hooks/useAuth';
// import useDeviceType from '@hooks/useDeviceType';
import ROUTES from '@routes/constants';
// import { useAuthStore } from '@store/storeAuth';
import { AnimatePresence } from "framer-motion";
import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import useFirebase from '@hooks/useFirebase';
// import { UpdateProvider } from './container/provider/UpdateProvider';
// import Error from './error/Error';
import ApiLoader from './loader/Loader';
import Loader from "@common/Loader";
// import { App } from '@capacitor/app'
// import { CapacitorUpdater } from '@capgo/capacitor-updater'
// import { storeDevice } from '@store/storeDevice';

// LAZY LOADING COMPONENTS
const SignUp = React.lazy(() => import('./app/auth/signUp'));
const Login = React.lazy(() => import('./app/auth/logIn'));
const ForgotPassword = React.lazy(() => import('./app/auth/forgotPassword'));
const Home = React.lazy(() => import('./app/home'));
const Select = React.lazy(() => import('./app/select'));
const PrivateRoute = React.lazy(() => import('./routes/containers/PrivateRoute'));
const PublicRoute = React.lazy(() => import('./routes/containers/PublicRoute'));

const AppComponent: React.FC = () => {
  useFirebase();
  const { isLoading } = useAuth();
  // useDeviceType();
  // const { device } = storeDevice();
  // const { user } = useAuthStore();

  if (isLoading) return <Loader />

  return (
    <>
      {/* {(device.platform == 'ios' || device.platform == 'android') && <UpdateProvider />} */}
      <Suspense fallback={<div aria-live="polite" style={{ visibility: 'hidden' }}>Loading...</div>}>
        {/* <Error /> */}
        <ApiLoader />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path={'/'} element={<PublicRoute RouteComponent={Login} />} />
            <Route path={ROUTES.SIGN_UP} element={<PublicRoute RouteComponent={SignUp} />} />
            <Route path={ROUTES.SIGN_IN} element={<PublicRoute RouteComponent={Login} />} />
            <Route path={ROUTES.FORGOT_PWD} element={<PublicRoute RouteComponent={ForgotPassword} />} />
            <Route path={ROUTES.SELECT} element={<PrivateRoute RouteComponent={Select} />} />
            <Route path={ROUTES.HOME} element={<PrivateRoute RouteComponent={Home} />} />
            <Route path="*" element={<PrivateRoute RouteComponent={Select} />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default AppComponent;







{/* <Route path={ROUTES.PROFILE} element={<PrivateRoute RouteComponent={ProfilePage} />}>
              <Route path={ROUTES.PROFILE_DETAILS} element={<Profile />} />
              <Route path={ROUTES.PROFILE_MODIFY} element={<ProfileModify />} />
            </Route> */}