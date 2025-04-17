"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const SanitizedContent = ({ html }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const cleanHTML = DOMPurify.sanitize(html);
  return <div  dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
};

export default SanitizedContent;