import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import List from "./List";
import Show from "./Show";

export const subjectRoutes = (
    <Route path="/matiéres" element={<Layout/>}>
        <Route index element={<List/>}/>
        <Route path="/matiéres/show/:id" element={<Show/>}/>
    </Route>

)