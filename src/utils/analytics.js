export const trackButtonClick = (
  buttonName,
  buttonLocation,
  additionalParameters = {}
) => {
  if (typeof window.gtag === "function") {
    window.gtag("event", "button_click", {
      button_name: buttonName,
      button_location: buttonLocation,
      page_path: `${window.location.pathname}${window.location.hash}`,
      ...additionalParameters,
    });
  } else {
    console.warn("Google Analytics has not loaded.");
  }

  if (typeof window.clarity === "function") {
    window.clarity("set", "button_name", buttonName);
    window.clarity("set", "button_location", buttonLocation);
    window.clarity("event", "button_click");
  }
};

export const trackClarityEvent = (eventName, customTags = {}) => {
  if (typeof window.clarity !== "function") {
    console.warn("Microsoft Clarity has not loaded.");
    return;
  }

  Object.entries(customTags).forEach(([key, value]) => {
    window.clarity("set", key, String(value));
  });

  window.clarity("event", eventName);
};
