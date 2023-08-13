import React, { useState } from "react";
import { shortUrl } from "../../App";
interface SubmittedShortProps {
  submittedShort: shortUrl;
}
export const SubmittedShort: React.FC<SubmittedShortProps> = ({
  submittedShort,
}) => {
  const backendUrl = "http://localhost:8080";
  const constructedUrl = `${backendUrl}/${submittedShort.short}`;
  const [copied, setCopied] = useState<boolean>(false);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(constructedUrl);
    setCopied(true);
  };
  return (
    <div className="submitted-short-container">
      <a href={constructedUrl}>{constructedUrl}</a>
      {copied ? (
        <div>"Copied to Clipboard"</div>
      ) : (
        <button onClick={() => copyToClipboard()}>Copy to Clipboard</button>
      )}
    </div>
  );
};
