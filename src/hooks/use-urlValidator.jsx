import { useState } from "react";

const UrlValidator = () => {
  const [isValid, setIsValid] = useState(null);

  const validateUrl = (url) => {
    if (!url) {
      setIsValid(false);
    }

    try {
      new URL(url);
      setIsValid(true);
      console.log("Guru", url);
    } catch (err) {
      setIsValid(false);
      console.log("Failed", url);
    }
  };

  return { isValid, validateUrl };
};

export default UrlValidator;
