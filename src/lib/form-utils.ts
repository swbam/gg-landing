/**
 * Checks URL query parameters for form submission status
 * Returns 'success', 'error', or null
 */
export function checkFormStatus(): string | null {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const formStatus = params.get('formStatus');
  
  if (formStatus === 'success' || formStatus === 'error') {
    // Clean up URL to prevent repeated toasts on refresh
    const newUrl = window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
    return formStatus;
  }
  
  return null;
}