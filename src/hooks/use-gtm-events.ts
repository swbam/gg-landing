interface GTMEvent {
  event: string;
  formLocation?: string;
  formStep?: number;
  benefitType?: string;
  conversionValue?: number;
}

export const useGTMEvents = () => {
  const pushEvent = (data: GTMEvent) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(data);
    }
  };

  const trackFormStart = (location: string) => {
    pushEvent({
      event: 'form_start',
      formLocation: location,
      formStep: 1
    });
  };

  const trackFormStepComplete = (location: string, step: number, benefitType?: string) => {
    pushEvent({
      event: 'form_step_complete',
      formLocation: location,
      formStep: step,
      benefitType,
      // Assign different values based on step completion
      conversionValue: step === 1 ? 5 : 15
    });
  };

  const trackFormSubmit = (location: string, benefitType: string) => {
    pushEvent({
      event: 'form_submit',
      formLocation: location,
      benefitType,
      conversionValue: 30
    });
  };

  const trackFormAbandonment = (location: string, step: number, benefitType?: string) => {
    pushEvent({
      event: 'form_abandonment',
      formLocation: location,
      formStep: step,
      benefitType
    });
  };

  return {
    trackFormStart,
    trackFormStepComplete,
    trackFormSubmit,
    trackFormAbandonment
  };
};
