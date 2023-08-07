import { useState, useEffect } from "react";
import "./App.css";
import { CreateShortForm } from "./components/CreateShortForm";
import { TopShortUrls } from "./components/TopShortUrls";

export type shortUrl = {
  id?: number;
  short?: string;
  full_url: string;
  num_clicked?: number;
  description?: string;
};

function App() {
  const backendUrl = "http://localhost:8080/";
  const [shortUrls, setShortUrls] = useState<shortUrl[]>([]);

  const fetchAllShortUrls = async () => {
    const response = await fetch(backendUrl + "short_urls/");
    const json = await response.json();
    setShortUrls(await json.data.data);
  };
  const createNewShortUrl = async (short: shortUrl) => {
    const response = await fetch(backendUrl + "short_urls/", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(short),
    });
    console.log(response);
  };
  useEffect(() => {
    fetchAllShortUrls();
  }, []);

  return (
    <div className="app-container">
      <div className="main-short-app">
        <CreateShortForm postNewShortUrl={createNewShortUrl}></CreateShortForm>
        {shortUrls.length > 0 ? <TopShortUrls shortUrls={shortUrls}></TopShortUrls>:<></>}
      </div>
    </div>
  );
}

export default App;
