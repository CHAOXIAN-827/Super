import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Vocabulary from "./pages/Vocabulary";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
