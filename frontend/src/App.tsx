import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./pages/Layout";
import About from "./pages/About";
import AdDetails from "./pages/AdDetails";
import Home from "./pages/Home";
import NewAdForm from "./pages/newAdForm";
import NewCategoryForm from "./pages/NewCategoryForm";
import SearchResults from "./pages/SearchResults";
import AdsByCategory from "./pages/AdsByCategory";
import EditAd from "./pages/EditAd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="ad/new" element={<NewAdForm />} />
        <Route path="ads/category/:id" element={<AdsByCategory />} />
        <Route path="ads/edit/:id" element={<EditAd />} />
        <Route path="ad/:id" element={<AdDetails />} />
        <Route path="category/new" element={<NewCategoryForm />} />
        <Route path="/search/:keyword" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default App;
