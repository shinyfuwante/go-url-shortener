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
  postNewShortUrl,
  setSubmitted,
  setSubmittedShort,
}) => {
  const [currShort, setCurrShort] = useState("");
  const [currFull, setCurrFull] = useState("");
  const validateInput = async () => {
    const errors = [];
    if (currFull.length == 0) {
      errors.push("fullUrl");
    } else if (!isWebUri(currFull)) {
      errors.push("fullUrl");
    }

    if (currShort.length > 10) {
      errors.push("shortUrl");
    } else if (currShort.indexOf(" ") >= 0) {
      errors.push("shortUrl");
    }

    return errors.length == 0;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    if (!validateInput) {
      return;
    }
    if (currShort == "") {
      setCurrShort(nanoid(10));
    }
    const newShort = {
      short: currShort,
      full_url: currFull,
      description: "",
      num_clicked: 0,
    };
    console.log(newShort);
    setSubmittedShort({ ...newShort });
    // postNewShortUrl({ ...newShort });
    setCurrShort("");
  };
  return (
    <form onSubmit={handleSubmit} className="create-short-form">
      <label htmlFor="short">Short:</label>
      <input
        aria-label="Shortened url: "
        aria-required="true"
        onChange={(e) => setCurrShort(e.target.value)}
        type="text"
        name="short"
        id="short"
      />
      <label htmlFor="full">Full Url:</label>
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
