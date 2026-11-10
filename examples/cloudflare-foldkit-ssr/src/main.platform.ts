/** Writes one cookie in the browser: the counter's only access to the page's `document`. */
export const setDocumentCookie = (cookie: string): void => {
  document.cookie = cookie;
};
