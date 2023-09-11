import { useState, useEffect } from "react";
import "./App.css";
import { CreateShortForm } from "./components/CreateShortForm";
import { TopShortUrls } from "./components/TopShortUrls";
import { SubmittedShort } from "./components/SubmittedShort";
import { FaGithub } from "react-icons/fa";

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
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [submittedShort, setSubmittedShort] = useState<shortUrl>();
  let submitForm;

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
    setSuccess(response.status == 201);
  };
  useEffect(() => {
    fetchAllShortUrls();
  }, []);

  if (submitted) {
    if (success) {
      submitForm = <SubmittedShort submittedShort={submittedShort!}></SubmittedShort>;
    } else {
      submitForm = "Something went wrong with your shortened url. Please try again."
    }
  } else {
    submitForm = (
      <CreateShortForm
        setSubmittedShort={setSubmittedShort}
        setSubmitted={setSubmitted}
        postNewShortUrl={createNewShortUrl}
      ></CreateShortForm>
    );
  }

  return (
    <div className="app-container">
      <h1 className="header">URL Shortener</h1>
      <main className="main-short-app">
        <div className="submit-short-form">{submitForm}</div>
        {shortUrls.length > 0 ? (
          <TopShortUrls shortUrls={shortUrls}></TopShortUrls>
        ) : (
          <></>
        )}
      </main>
      <footer className="footer">
        <a href="https://github.com/shinyfuwante">
          <FaGithub className="github-icon" />
          shinyfuwante
          <img
            src="https://avatars.githubusercontent.com/u/102276140?v=4"
            alt="Icon for github profile shinyfuwante"
          ></img>
        </a>
      </footer>
    </div>
  );
}

export default App;
