import React, { useEffect, useState } from "react";
import CookieConsent from "./Components/CookieConsent";
import looping_video from "./Assets/looping_video.mp4";

function App() {
  const [showCookiesModal, setShowCookiesModal] = useState(true);
  const [geoLocation, setGeoLocation] = useState(null);
  const [pushNotificationRequested, setPushNotificationRequested] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState(""); 
  const [intervalId, setIntervalId] = useState(null);
  const [captchaChallenge, setCaptchaChallenge] = useState(null);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [captchaSuccessCount, setCaptchaSuccessCount] = useState(0);


  const notifications = [
    "New offer! Get 10% off on your next purchase.",
    "Exclusive content just for you! Check it out now!",
    "Did you know we have a secret discount code? Ask us!",
    "Your favorite product is back in stock! Buy now!",
    "Your pet is judging you for not getting them a treat. Go ahead, spoil them!",
    "Warning: Your coffee is getting cold. Go save it before it's too late!",
    "Did you know you're one step away from becoming a professional napper?",
    "The laundry's not going to fold itself... unless you have superpowers.",
    "Reminder: You're a rockstar. Don't forget to practice your air guitar.",
    "You've been staring at the screen for too long. Time for a snack break!",
    "Just a heads up: The cookies in the jar are in danger. Act fast!",
    "Hurry up! Limited-time sale ends soon.",
    "Your plants are thirsty. They promise not to judge if you water them now.",
    "Your phone is whispering, 'I need charging.' Don't ignore it this time!",
    "Did you hear that? It was the sound of your next big idea. Go chase it!"
  ];
  
  const captchaChallenges = [
    { question: "What is the meaning of life?", correctAnswer: "" },
    { question: "If you are not a robot, prove your humanity in one word.", correctAnswer: "" },
    { question: "If a tree falls in the forest and no one hears it, does it make a sound?", correctAnswer: "" },
    { question: "What would you name your pet potato?", correctAnswer: "" },
  
    { question: "______, tumse na ho payega.", correctAnswer: "Beta" },
    { question: "Tum to bade ______ driver nikle yaar.", correctAnswer: "heavy" },
    { question: "Aap pehle ______ samajhiye.", correctAnswer: "chronology" },
    { question: "______ nahi aa raha hai.", correctAnswer: "maja" },
  
    { question: "If 5 apples = 3 bananas and happiness = pizza, calculate x.", correctAnswer: "" },
    { question: "Solve this equation: 1 + 1 = ? (Hint: It's not 2.)", correctAnswer: "11" },
    { question: "If Pi = 3.14 and cake = happiness, find the meaning of Pi.", correctAnswer: "" },
    { question: "Calculate the number of stars in the universe and divide by zero.", correctAnswer: "" },
  
    { question: "Find the bug: `console.log('Hello World!')`.", correctAnswer: "" },
    { question: "What's wrong in this function? `function add(a, b) { return a + b; }`", correctAnswer: "" },
    { question: "Spot the error: `if (true == false) { console.log('Impossible!'); }`", correctAnswer: "" },
    { question: "Debug this code: `let x = 1; x += 2; x = ?`", correctAnswer: "" },
  
    { question: "Never gonna give you ______.", correctAnswer: "up" },
    { question: "Never gonna let you ______.", correctAnswer: "down" },
    { question: "Never gonna run ______ and desert you.", correctAnswer: "around" },
    { question: "Never gonna make you ______.", correctAnswer: "cry" },
  
    { question: "Pehli fursat me ______.", correctAnswer: "nikal" },
    { question: "Yeh bik gayi hai ______.", correctAnswer: "gormint" },
    { question: "Ab ghodo ki race me ________ bhi daudenge ?!!", correctAnswer: "gadhe" },
    { question: "Dekh raha hai ______.", correctAnswer: "binod" },
  ];
  

  const getRandomCaptcha = () => {
    const randomChallenge =
      captchaChallenges[Math.floor(Math.random() * captchaChallenges.length)];
    setCaptchaChallenge(randomChallenge);
  };

  const handleCaptchaInput = (e) => {
    setCaptchaInput(e.target.value);
    setCaptchaError("");
  };

  const verifyCaptcha = () => {
    if (captchaInput.trim().toLowerCase().includes(captchaChallenge.correctAnswer.toLowerCase())) {
      alert("CAPTCHA Verified!!... I still have a feeling....you might be a bot");
      setCaptchaInput("");
      setCaptchaError("");
      setCaptchaChallenge(null);
      
      setCaptchaSuccessCount(prevCount => prevCount + 1);
  
      if (captchaSuccessCount + 1 >= 3) {
        alert("... .. I am starting to feel you are not a bot");
        setCaptchaChallenge(null);
      } else {
        getRandomCaptcha(); 
      }
      
    } else {
      setCaptchaError("Incorrect CAPTCHA. Please try again. Hmm, I think you are a bot.");
    }
  };
  


  const requestGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation(position.coords);
          alert("Your coordinates are: " + position.coords.latitude + ", " + position.coords.longitude);
        },
        () => alert("Please grant the location so that we can track you.")
      );
    }
  };

  const requestPushNotification = () => {
    if (Notification.permission === "granted") {
      alert("Permission for push notifications already granted!");
      startRandomNotifications();

    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setPushNotificationRequested(true);
          startRandomNotifications();
        }
      });
    }
  };

  const startRandomNotifications = () => {
    const id = setInterval(() => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      new Notification(randomNotification);
    }, 5000);
    setIntervalId(id);
  };

  const stopRandomNotifications = () => {
    clearInterval(intervalId);
  };



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handleEmailSubmit = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setShowEmailModal(false); 
      alert("Thank you for subscribing to our newsletter!");
    }
  };

  useEffect(() => {
    requestGeoLocation();
  }, []);

  useEffect(() => {
    if (!showCookiesModal) {
      getRandomCaptcha();
      setShowEmailModal(true);
      
    }
  }, [showCookiesModal]);

  useEffect(() => {
    if (!showEmailModal) {
      requestPushNotification();
    }
  }, [showEmailModal]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);  


  const showAlert = () => {
    if (!captchaChallenge && captchaSuccessCount >= 3) {
      setTimeout(() => {
        alert("Enjoy this unstoppable video! and don't forget to subscribe to our newsletter! You're welcome!");
      }, 1000); 
    }
  }
  

  useEffect(() => {
    if (!captchaChallenge && captchaSuccessCount >= 3) {
      document.getElementById("autoplay-video").play();
      
    }
  }, [captchaChallenge,captchaSuccessCount]);

  return (
    <div
      className={`App min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-black to-black text-white ${
        showCookiesModal ? "backdrop-blur-sm" : ""
      }`}
    >
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Welcome to the Best Website!</h1>
      </header>

      {showCookiesModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <CookieConsent onClose={() => setShowCookiesModal(false)} />
        </div>
      )}

      {geoLocation && (
        <p className="mt-2 text-gray-200">
          Thanks for sharing! Your location is Latitude: {geoLocation.latitude}, Longitude:{" "}
          {geoLocation.longitude}.
        </p>
      )}



      {showEmailModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black bg-opacity-50"
        >
          <div className="modal bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-8 rounded-xl shadow-lg w-96 text-center transform transition-transform scale-100 hover:scale-105">
            <h2 className="text-3xl font-semibold text-white mb-6">Join Our Newsletter!</h2>
            <input
              type="email"
              className="border-2 border-gray-300 p-3 rounded-xl w-full mb-4 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-400 text-sm mt-2">{emailError}</p>
            )}
            <button
              className="btn bg-yellow-500 hover:bg-yellow-600 py-2 px-6 rounded-xl text-lg font-semibold text-white transition-all duration-300"
              onClick={handleEmailSubmit}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}

      <video
        id="autoplay-video"
        className="mt-4 w-1/2 h-1/2 rounded-md"
        controls={false}
        loop
        onPlay={showAlert()}
      >
        <source src={looping_video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {captchaChallenge && captchaSuccessCount < 3 && (
  <div
    className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md bg-black bg-opacity-50"
  >
    <div className="modal bg-black p-8 rounded-xl shadow-lg w-96 text-center transform transition-transform scale-100 hover:scale-105">
      <h2 className="text-3xl font-semibold text-white mb-6">Please Verify You Are Not a Bot</h2>
      <p className="mb-4 text-white">{captchaChallenge.question}</p>
      <input
        type="text"
        className="border-2 border-gray-300 p-2 rounded-lg w-full mb-4 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={captchaInput}
        onChange={handleCaptchaInput}
      />
      <button
        className="ml-2 btn bg-green-500 hover:bg-green-600 py-1 px-3 rounded"
        onClick={verifyCaptcha}
      >
        Submit
      </button>
      {captchaError && <p className="text-red-400 mt-2">{captchaError}</p>}
    </div>
  </div>
)}

    </div>
  );
}

export default App;