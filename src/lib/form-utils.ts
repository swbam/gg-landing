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
  formType: 'hero' | 'bottom' | 'mobile-fullscreen';
  location: string;
  isPartialSubmission?: boolean;
  timestamp: string;
}

// The Apps Script Web App URL that handles form submissions
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbx_lPkD90PE-dA014f-IQUnJw8qIxQF0H7ZfblBHsym-nYHKndAycyqr8kld2jJWyehYA/exec';

export async function submitToGoogleSheet(formData: Omit<FormData, 'formType'>, location: 'hero' | 'bottom' | 'mobile-fullscreen', isPartialSubmission: boolean = false) {
  try {
    const formDataToSend = new FormData();
    const timestamp = new Date().toISOString();

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, String(value));
    });

    // Add metadata
    formDataToSend.append('formType', location);
    formDataToSend.append('location', location);
    formDataToSend.append('isPartialSubmission', isPartialSubmission ? 'true' : 'false');
    formDataToSend.append('timestamp', timestamp);

    const response = await fetch(GOOGLE_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formDataToSend
    });

    if (!response.ok && response.type !== 'opaque') {
      throw new Error('Network response was not ok');
    }

    return true;
  } catch (error) {
    console.error('Error submitting to Google Sheet:', error);
    throw error;
  }
}