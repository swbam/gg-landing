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

interface FormData {
  phone: string;
  email: string;
  benefitType: string;
  name: string;
  message: string;
}

// The Apps Script Web App URL that handles form submissions
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx_lPkD90PE-dA014f-IQUnJw8qIxQF0H7ZfblBHsym-nYHKndAycyqr8kld2jJWyehYA/exec';

export async function submitToGoogleSheet(formData: FormData, isPartialSubmission: boolean = false) {
  try {
    const formDataToSend = new FormData();
    Object.entries({
      ...formData,
      submissionType: isPartialSubmission ? 'partial' : 'complete',
      timestamp: new Date().toISOString(),
      source: window.location.pathname
    }).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formDataToSend
    });

    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    throw error;
  }
}