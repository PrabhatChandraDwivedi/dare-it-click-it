import React, { useEffect, useState } from 'react';

const COOKIE_NAME = 'cookie_consent_status';
const COOKIE_EXPIRE_DAYS = 365;

const CookieConsent = ({onClose}) => {
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);

  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
  };

  const getCookie = (name) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const handleCheckboxChange = () => {
    const functionalChecked = document.getElementById('functional').checked;
    const analyticsChecked = document.getElementById('analytics').checked;
    const advertisingChecked = document.getElementById('advertising').checked;
    const thirdPartyChecked = document.getElementById('thirdParty').checked;

    setIsAnyCheckboxChecked(
      functionalChecked || analyticsChecked || advertisingChecked || thirdPartyChecked
    );
  };

  const savePreferences = () => {
    const preferences = {
      necessary: true,
      functional: document.getElementById('functional').checked,
      analytics: document.getElementById('analytics').checked,
      advertising: document.getElementById('advertising').checked,
      thirdParty: document.getElementById('thirdParty').checked,
    };
    setCookie(COOKIE_NAME, JSON.stringify(preferences), COOKIE_EXPIRE_DAYS);
    onClose(); 
    hideBanner();

  };

  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true,
      thirdParty: true,
    };
    setCookie(COOKIE_NAME, JSON.stringify(allAccepted), COOKIE_EXPIRE_DAYS);
    onClose(); 
    hideBanner();
  };

  const hideBanner = () => {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  };

  const applyStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      #cookie-consent-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        background: linear-gradient(145deg, #212121, #1a1a1a);
        color: #e0e0e0;
        padding: 24px;
        z-index: 1000;
        border-radius: 12px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        font-family: "Roboto", Arial, sans-serif;
        animation: slide-up 0.5s ease-out;
      }
      @keyframes slide-up {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .consent-content {
        max-width: 640px;
        margin: 0 auto;
        text-align: center;
      }
      #cookie-consent-banner h2 {
        margin-top: 0;
        margin-bottom: 12px;
        font-size: 1.75em;
        color: #ffffff;
        font-weight: bold;
      }
      #cookie-consent-banner p {
        margin-bottom: 20px;
        line-height: 1.7;
        font-size: 1rem;
        color: #bdbdbd;
      }
      .cookie-options {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: center;
        margin-bottom: 24px;
      }
      .cookie-options label {
        display: flex;
        align-items: center;
        background-color: #292929;
        padding: 10px 15px;
        border-radius: 8px;
        cursor: pointer;
        color: #ffffff;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .cookie-options label:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      }
      .cookie-options input[type="checkbox"] {
        margin-right: 12px;
      }
      .consent-actions {
        display: flex;
        justify-content: center;
        gap: 12px;
      }
      #cookie-consent-banner button {
        background: linear-gradient(145deg, #333333, #444444);
        color: #ffffff;
        border: none;
        padding: 12px 24px;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.3s ease;
      }
      #cookie-consent-banner button:hover {
        background: linear-gradient(145deg, #444444, #555555);
        transform: translateY(-2px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
      }
      #accept-all {
        background: linear-gradient(145deg, #4caf50, #45a049) !important;
        color: #ffffff;
      }
      #accept-all:hover {
        background: linear-gradient(145deg, #45a049, #3e8e41) !important;
      }
      @media (max-width: 600px) {
        #cookie-consent-banner {
          bottom: 0;
          left: 0;
          right: 0;
          border-radius: 0;
          padding: 16px;
        }
        .consent-actions {
          flex-direction: column;
        }
        .consent-actions button {
          width: 100%;
          padding: 12px;
          font-size: 1rem;
        }
      }
    `;
    document.head.appendChild(style);
  };

  useEffect(() => {
    const consentStatus = getCookie(COOKIE_NAME);
    if (!consentStatus) {
      applyStyles();
    }
  }, []);

  return (
    <div id="cookie-consent-banner">
      <div className="consent-content">
        <h2>🍪 Cookie Settings</h2>
        <h3><b>Warning!! Might Trigger Epileptic Seizure</b></h3>

        <p>We use cookies to enhance your annoyance experience, flood your feed with ads you don't want, and analyze our CPM. Please select your preferences below (like we will allow).</p>
        <div className="cookie-options">
          <label>
            <input type="checkbox" id="necessary" checked disabled />
            Necessary (Always enabled)
          </label>
          <label>
            <input
              type="checkbox"
              id="functional"
              onChange={handleCheckboxChange}
            />
            Accept these
          </label>
          <label>
            <input
              type="checkbox"
              id="analytics"
              onChange={handleCheckboxChange}
            />
            Accept those
          </label>
          <label>
            <input
              type="checkbox"
              id="advertising"
              onChange={handleCheckboxChange}
            />
            Accept some
          </label>
          <label>
            <input
              type="checkbox"
              id="thirdParty"
              onChange={handleCheckboxChange}
            />
            Accept All
          </label>
        </div>
        <div className="consent-actions">
          <button
            id="save-preferences"
            onClick={savePreferences}
            disabled={!isAnyCheckboxChecked}
            style={{cursor: isAnyCheckboxChecked ? 'pointer' : 'not-allowed'}}

          >
            Save Preferences
          </button>
          <button id="accept-all" onClick={acceptAllCookies}
                      disabled={!isAnyCheckboxChecked}
                      style={{cursor: isAnyCheckboxChecked ? 'pointer' : 'not-allowed'}}

          >Save</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
