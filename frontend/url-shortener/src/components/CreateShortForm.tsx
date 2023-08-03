import React from "react";
import { shortUrl } from "../App";
import { useState } from "react";
import { nanoid } from "nanoid";

export const CreateShortForm = (setNewShortUrl: (arg0: shortUrl) => void) => {
  const [currShort, setCurrShort] = useState("");
  const [currFull, setCurrFull] = useState("");
  const [currDesc, setCurrDesc] = useState("");
  const handleSubmit = () => {
    if (currShort == "") {
      setCurrShort(nanoid());
    }
    const newShort = {
      short: currShort,
      full_url: currFull,
      description: currDesc,
      num_clicked: 0,
    };
    setNewShortUrl({ ...newShort });
  };
  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};
