import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import DetailView from "./Pages/DetailView";

export const router = createBrowserRouter(
  createRoutesFromElements ( 
    <Route path= "/" element= {<Layout />} errorElement={<h1>Ops! Website Not found! </h1>}>
      <Route index element={<Home/>}/>
      <Route path="detail/:type/:uid" element={<DetailView/>}/>
    </Route>
    )
  )