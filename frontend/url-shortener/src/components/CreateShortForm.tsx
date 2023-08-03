import React from "react";
import { shortUrl } from "../App";
import { useState } from "react";

export const CreateShortForm = (setNewShortUrl: (arg0: shortUrl) => void) => {
  const [newShort, setNewShort] = useState<shortUrl>();
  const [currShort, setCurrShort] = useState("");
  const [currFull, setCurrFull] = useState("");
  const [currDesc, setCurrDesc] = useState("");
  const handleSubmit = () => {

  }
  // need short url
  // need full url
  // need desc
  return (
    <div>
      <label htmlFor="short">Short:</label>
      <input type="text" name="short" id="short" />
      <label htmlFor="full">Full Url:</label>
      <input type="text" name="full" id="full" />
      <label htmlFor="desc">Description</label>
      <input type="text" name="desc" id="desc" />
    </div>
  );
};
