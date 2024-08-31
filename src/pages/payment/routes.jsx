import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import LayoutPayment from "./Layout";
import PrimarySchoolTab from "./list/PrimarySchoolTab";
import MiddleSchoolTab from "./list/MiddleSchoolTab";
import HightSchoolTab from "./list/HightSchoolTab";
import Show from "./Show";

export const paymentRoutes = (
  <Route path="/" element={<Layout />}>
    <Route path="paiements" element={<LayoutPayment />}>
      <Route index element={<h1 className="text-2x font-bold">Welcome to Payment</h1>} />
      <Route path="primaire" element={<PrimarySchoolTab />} />
      <Route path="college" element={<MiddleSchoolTab />} />
      <Route path="lycee" element={<HightSchoolTab />} />
      <Route path="show/:id" element={<Show />} />
    </Route>{" "}
  </Route>
);
