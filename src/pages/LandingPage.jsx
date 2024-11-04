import React from 'react';
import bg from '../img/hero-banner.jpg'
import Slider from '../components/slider/Slider';
import Navbar from '../components/navbar/Navbar';
import ContactForm from '../components/form/ContactForm'
import CookieConsent from '../components/form/cookieComponents';

const LandingPage = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        fontFamily: 'sans-serif',
      }}
    >
      <div className="bg-stone-950 bg-opacity-10 h-full w-full relative flex flex-col overflow-y-auto">
        <CookieConsent />

        <div className="md:w-fit w-full transform -translate-x-1/2 left-1/2 absolute">
          <Navbar />
          <div className="text-white bg-white w-full h-fit flex flex-col md:flex-row justify-center items-center overflow-x-hidden p-2 gap-3">
            {/* Slider on the left */}
            <div className="md:w-[570px] w-full md:h-[600px] h-[420px] min-w-[300px] max-w-[570px] bg-black shadow-md shadow-black">
              <Slider />
            </div>

            {/* ContactForm on the right */}
            <div className="md:w-[570px] bg-white w-full md:h-[600px] h-fit min-w-[300px] max-w-[570px] bg-cover bg-center rounded-lg">
              <ContactForm />
            </div>
          </div>
          <p className="md:mt-4 py-2 text-center w-full bg-black md:bg-transparent md:text-md text-xs text-white font-bold">
            &#169; {" "}COPYRIGHT 2024 - <a href="https://keraladrives.com/" target="_blank">KERALA DRIVES</a>. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
