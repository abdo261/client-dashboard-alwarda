import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import List from "./List";
import Show from "./Show";

export const paymentRoutes = (
  <Route path="paiements" element={<Layout />}>
    <Route index element={<List />} />
    <Route path="show/:id" element={<Show />} />
  </Route>
);
