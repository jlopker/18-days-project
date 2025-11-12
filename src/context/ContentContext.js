import React, { createContext, useState, useEffect } from 'react';

export const ContentContext = createContext();

const DEFAULT_CONTENT = {
  heroTitle: 'The 18 Days Project is a writing adventure to unleash your creativity',
  heroSubtitle: 'Generate new work. Get creative support. Make inspired progress.',
  heroButtonText: 'Cocoon Edition — December 1',
  announcementText: "We're back! The Cocoon Edition starts Monday, December 1, 2025",
  announcementButtonText: 'Learn more'
};

export function ContentProvider({ children }) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const isDevelopment = window.location.hostname === 'localhost';
        const apiUrl = isDevelopment
          ? 'http://localhost:3001/api/admin/get-content'
          : '/api/save-content';

        console.log('ContentContext: Loading content from', apiUrl);
        const response = await fetch(apiUrl);

        if (response.ok) {
          const result = await response.json();
          console.log('ContentContext: Got response', result);
          if (result.data) {
            console.log('ContentContext: Setting content from API', result.data);
            setContent(result.data);
          } else {
            console.log('ContentContext: No data in response, using defaults');
            setContent(DEFAULT_CONTENT);
          }
        } else {
          console.warn('ContentContext: API response not ok', response.status);
          setContent(DEFAULT_CONTENT);
        }
      } catch (error) {
        console.error('ContentContext: Failed to load content from API', error);
        console.log('ContentContext: Using default content');
        setContent(DEFAULT_CONTENT);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  return (
    <ContentContext.Provider value={{ content, isLoading }}>
      {children}
    </ContentContext.Provider>
  );
}
