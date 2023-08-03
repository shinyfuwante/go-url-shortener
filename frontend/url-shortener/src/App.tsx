import { useState, useEffect } from "react";
import "./App.css";

export type shortUrl = {
  id: number;
  short_url: string;
  full_url: string;
  num_clicked: number;
  description: string;
};

function App() {
  const backendUrl = "http://localhost:8080/";
  const [shortUrls, setShortUrls] = useState<shortUrl[]>();

  const fetchAllShortUrls = async () => {
    const response = await fetch(backendUrl + "short_urls/");
    const json = await response.json();
    setShortUrls(await json.data);
  };
  useEffect(() => {
    fetchAllShortUrls();
  }, []);
  return <>hi</>;
}

export default App;
