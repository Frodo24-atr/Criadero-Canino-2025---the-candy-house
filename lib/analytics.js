/* Google Analytics y Search Console */

// Google Analytics 4 (GA4)
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX';

// Función para enviar eventos a Google Analytics
export const gtag = (...args) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag(...args);
  }
};

// Función para trackear page views
export const pageview = (url) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// Función para trackear eventos personalizados
export const event = ({ action, category, label, value }) => {
  gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Eventos específicos del criadero
export const trackCockerInterest = () => {
  event({
    action: 'view_breed',
    category: 'engagement',
    label: 'cocker_spaniel',
  });
};

export const trackSchnauzerInterest = () => {
  event({
    action: 'view_breed', 
    category: 'engagement',
    label: 'schnauzer_miniatura',
  });
};

export const trackContactForm = () => {
  event({
    action: 'contact_form_submit',
    category: 'lead_generation',
    label: 'contact_page',
  });
};

export const trackWhatsAppClick = () => {
  event({
    action: 'whatsapp_click',
    category: 'lead_generation', 
    label: 'whatsapp_button',
  });
};

export const trackTestimonial = () => {
  event({
    action: 'testimonial_submit',
    category: 'engagement',
    label: 'user_testimonial',
  });
};
