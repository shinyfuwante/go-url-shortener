import React from "react";
import { FormEvent } from "react";
import { shortUrl } from "../../App";
import { useState } from "react";
import { nanoid } from "nanoid";
import "./CreateShortForm.css";

interface CreateShortFormProps {
  postNewShortUrl: (arg0: shortUrl) => Promise<void>;
}

export const CreateShortForm: React.FC<CreateShortFormProps> = ({
  postNewShortUrl,
}) => {
  const [currShort, setCurrShort] = useState("");
  const [currFull, setCurrFull] = useState("");
  const [currDesc, setCurrDesc] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currShort == "") {
      setCurrShort(nanoid(10));
    }
    const newShort = {
      short: currShort,
      full_url: currFull,
      description: currDesc,
      num_clicked: 0,
    };
    console.log(newShort);
    postNewShortUrl({ ...newShort });
    setCurrShort("");
  };
  return (
    <form onSubmit={handleSubmit} className="create-short-form">
      <label htmlFor="short">Short:</label>
      <input
        onChange={(e) => setCurrShort(e.target.value)}
        type="text"
        name="short"
        id="short"
      />
      <label htmlFor="full">Full Url:</label>
      <input
        onChange={(e) => setCurrFull(e.target.value)}
        type="text"
        name="full"
        id="full"
        required={true}
      />
      <label htmlFor="desc">Description</label>
      <input
        onChange={(e) => setCurrDesc(e.target.value)}
        type="text"
        name="desc"
        id="desc"
      />
      <button type="submit">
        Submit
      </button>
    </form>
  );
};

export default CreateShortForm;
