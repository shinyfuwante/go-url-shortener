import React from "react";
import { FormEvent } from "react";
import { shortUrl } from "../../App";
import { useState } from "react";
import { nanoid } from "nanoid";
import "./CreateShortForm.css";
import { isWebUri } from "valid-url";

interface CreateShortFormProps {
  postNewShortUrl: (arg0: shortUrl) => Promise<void>;
  setSubmitted: (arg0: boolean) => void;
  setSubmittedShort: (arg0: shortUrl) => void;
}

export const CreateShortForm: React.FC<CreateShortFormProps> = ({
  setSubmitted,
  setSubmittedShort,
  postNewShortUrl
}) => {
  const [currShort, setCurrShort] = useState("");
  const [currFull, setCurrFull] = useState("");
  const [errorsObj, setErrorsObj] = useState<Record<string, string>>({});
  const validateInput = (newShort: shortUrl) => {
    const errors: Record<string, string> = {};
    // debugger;
    if (!newShort.full_url) {
      errors.full_url = "Please input a url to shorten.";
    } else if (!isWebUri(newShort.full_url)) {
      errors.full_url = "Please input a valid url.";
    }
    if (newShort.short != null) {
      if (newShort.short.length > 10) {
        errors.short_url =
          "Please shorten your desired string to be less than 10 characters.";
      } else if (newShort.short.indexOf(" ") >= 0) {
        errors.short_url =
          "Please remove any spaces out of your shortened url.";
      }
    }
    return errors;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newShort = {
      short: currShort,
      full_url: currFull,
      description: "",
      num_clicked: 0,
    };
    const errors = validateInput(newShort);
    const errorsArray = Object.keys(errors);
    if (errorsArray.length !== 0) {
      setErrorsObj(errors);
      return;
    } 
    if (currShort == "") {
      newShort.short = nanoid(10);
    }
    console.log(newShort);
    setSubmittedShort({ ...newShort });
    postNewShortUrl(newShort);
    setCurrShort("");
    setSubmitted(true);
  };
  return (
    <form onSubmit={handleSubmit} className="create-short-form">
      <label htmlFor="short">Short:</label>
      {errorsObj.short_url && <p className="error">{errorsObj.short_url}</p>}
      <input
        aria-label="Shortened url: "
        onChange={(e) => setCurrShort(e.target.value)}
        type="text"
        name="short"
        id="short"
      />
      <label htmlFor="full">Full Url:</label>
      {errorsObj.full_url && <p className="error">{errorsObj.full_url}</p>}
      <input
        aria-label="Full url: "
        aria-required="true"
        onChange={(e) => setCurrFull(e.target.value)}
        type="text"
        name="full"
        id="full"
        required={true}
      />
      <button type="submit">Create Short URL</button>
    </form>
  );
};

export default CreateShortForm;
