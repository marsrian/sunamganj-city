"use client";
import React, { useEffect } from 'react';
import DOMPurify from 'dompurify';

const RichTextDisplay = ({ content }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const cleanHtml = DOMPurify.sanitize(content || '', {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 's', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'blockquote', 'pre',
      'a', 'img', 'iframe', 'div', 'span',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'width', 'height', 
      'style', 'class', 'frameborder', 'allowfullscreen'
    ],
  });

  return (
    <div 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default RichTextDisplay;