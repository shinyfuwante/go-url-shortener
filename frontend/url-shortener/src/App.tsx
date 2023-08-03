import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";

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
  const [newShortUrl, setNewShortUrl] = useState<shortUrl>();

  const fetchAllShortUrls = async () => {
    const response = await fetch(backendUrl + "short_urls/");
    const json = await response.json();
    setShortUrls(await json.data.data);
  };
  useEffect(() => {
    fetchAllShortUrls();
  }, []);

  const topFiveShorts = () => {
    return (
      <>
        {shortUrls.map((short) => (
          <div key={short.id}>
            {short.short}
            -----------------
            {short.full_url}
            *---------------*
          </div>
        ))}
      </>
    );
  };


  return (
    <>{shortUrls.length > 0 ? topFiveShorts() : <>{shortUrls.length}</>}</>
  );
}

export default App;
