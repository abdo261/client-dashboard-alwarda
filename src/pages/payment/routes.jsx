import { Route } from "react-router-dom";
import Layout from "../../layout/Layout";
import LayoutPayment from "./Layout";
import PrimarySchoolTab from "./list/PrimarySchoolTab";
import MiddleSchoolTab from "./list/MiddleSchoolTab";
import HightSchoolTab from "./list/HightSchoolTab";
import Show from "./Show";
import Index from "./Index";

export const paymentRoutes = (
  <Route path="/" element={<Layout />}>
    <Route path="paiements" element={<LayoutPayment />}>
      <Route index element={<Index />} />
      <Route path="primaire" element={<PrimarySchoolTab />} />
      <Route path="primaire/show/:id" element={<Show />} />

      <Route path="college" element={<MiddleSchoolTab />} />
      <Route path="college/show/:id" element={<Show />} />
      <Route path="lycee" element={<HightSchoolTab />} />
      <Route path="lycee/show/:id" element={<Show />} />
      {/* <Route path="show/:id" element={<Show />} /> */}
    </Route>
  </Route>
);
