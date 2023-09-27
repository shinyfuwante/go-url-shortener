
import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import RedirectUrl from "./components/RedirectUrl/RedirectUrl";
import { MainApp } from "./components/MainApp";

export type shortUrl = {
  id?: number;
  short?: string;
  full_url: string;
  num_clicked?: number;
  description?: string;
};

export const backendUrl = "https://go-url-shortener-production.up.railway.app/";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp></MainApp>}>
          
        </Route>
        <Route path="/:short" element={<RedirectUrl />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
