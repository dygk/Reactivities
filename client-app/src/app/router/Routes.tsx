import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import LoginForm from "../../features/users/LoginForm";



export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path:'activities',element: <ActivityDashboard/>},
            {path:'activities/:id',element: <ActivityDetails/>},
            {path:'createActivity',element: <ActivityForm key="create"/>},
            {path:'manage/:id',element: <ActivityForm key="manage"/>},
            {path:'login',element: <LoginForm />},
        ]


    }]



export const router = createBrowserRouter(routes);