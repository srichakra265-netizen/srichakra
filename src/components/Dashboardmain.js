'use client';

import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Slider from "react-slick";

const getTomorrowDateString = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const getTimeBasedGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const dairyQuotes = [
  'Delivering freshness, one indent at a time.',
  'Pure dairy, pure goodness.',
  'The heart of every meal starts with fresh dairy.',
  'Quality you can taste. Freshness you can trust.',
  'From our farms to your agents, with care.'
];

export default function Dashboardmain() {
  const router = useRouter();
  const [agentName, setAgentName] = useState('Agent');
  const [greeting, setGreeting] = useState('Welcome');
  const [selectedDate, setSelectedDate] = useState('');
  const [dateError, setDateError] = useState(false);
  const [dairyQuote, setDairyQuote] = useState('');

  useEffect(() => {
  setAgentName("Vishnu"); 

  setGreeting(getTimeBasedGreeting());
  setSelectedDate(getTomorrowDateString());

  const randomIndex = Math.floor(Math.random() * dairyQuotes.length);
  setDairyQuote(dairyQuotes[randomIndex]); 
}, []);


  const handleStartIndent = () => {
    if (!selectedDate) {
      setDateError(true);
      return; 
    }
    setDateError(false);
    router.push(`/Products?date=${selectedDate}`);
  };

   const NextArrow = ({ onClick }) => (
      <div
        className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-20"
        onClick={onClick}
      >
        <span className="text-black text-6xl">&#8250;</span>
      </div>
    );

    const PrevArrow = ({ onClick }) => (
      <div
        className="absolute left-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer z-20"
        onClick={onClick}
      >
        <span className="text-black text-6xl">&#8249;</span>
      </div>
    );


    const settings = {
      dots: false,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      infinite: true,
      speed: 600,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  ;


  return (
    <>
      <div className="dashboard">
        <div className="greeting-section">
          <h1 className="greeting-text">
            {greeting},<br />
            <span className="agent-name">{agentName}!</span>
          </h1>
        </div>

        <div className="hero-card">
          <div className="card-overlay" />
          <div className="card-content">
          <div className="relative w-full overflow-hidden rounded-xl">
  <Slider {...settings}>

    <div className="flex justify-center items-center h-48">
      <Image
        src="/Milk/Buffalo Tones Milk_500ml.png"
        alt="milk"
        width={400}
        height={200}
        className="object-contain h-full"
      />
    </div>

    <div className="flex justify-center items-center h-48">
      <Image
        src="/Curd/Diet_Curd Bucket_10kg.png"
        alt="curd"
        width={400}
        height={200}
        className="object-contain h-full"
      />
    </div>

    <div className="flex justify-center items-center h-48">
      <Image
        src="/Ghee/Pet Jar/SCM_Pure Cow Ghee PET JAR_500g.png"
        alt="ghee"
        width={400}
        height={200}
        className="object-contain h-full"
      />
    </div>

    <div className="flex justify-center items-center h-48">
      <Image
        src="/Paneer/SCM_Paneer 200g.png"
        alt="paneer"
        width={400}
        height={200}
        className="object-contain h-full"
      />
    </div>

  </Slider>
</div>


            <p className="quote-text pt-5">"{dairyQuote}"</p>
            <label className="date-label">
              <Calendar className="label-icon" />
              Select Your Order Date
            </label>

            <div className="date-input-wrapper">
              <input
                type="date"
                className={`date-input ${dateError ? 'error' : ''}`}
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setDateError(false);
                }}
              />
            </div>

            {dateError && <p className="error-text">Please select a valid date.</p>}

            <button onClick={handleStartIndent} className="cta-button">
              Start New Order
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
          padding: 5rem 0rem 4rem;
          box-sizing: border-box;
        }




        .greeting-section {
          text-align: center;
          margin-bottom: 1rem;
          z-index: 10;
        }

        .greeting-text {
          font-size: 3.5rem;
          font-weight: 900;
          line-height: 1.1;
          margin: 0;
          background: linear-gradient(to right, #0891b2, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .agent-name {
          background: #0891b2
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 4rem;
        }

        .hero-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          height: 70vh;
          min-height: 500px;
          overflow: hidden;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.25);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.1) 30%,
            rgba(0,0,0,0.3) 100%
          );
          z-index: 1;
        }

        .card-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          color: white;
        }

        .quote-text {
          font-size: 1.5rem;
          color: #000000;
          font-style: italic;
          text-align: center;
          margin: 0 0 1rem;
          text-shadow: 0 1px 4px rgba(0,0,0,0.5);
          opacity: 0.95;
        }

        .date-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #000000;
          text-shadow: 0 1px 3px rgba(0,0,0,0.4);
        }

        .label-icon {
          width: 1.1rem;
          height: 1.1rem;
        }

        .date-input-wrapper {
          position: relative;
          margin: 1rem 0;
        }

        .date-input {
          width: 100%;
          padding: 1rem 1.5rem 1rem 1.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          background: rgba(255,255,255,0.95);
          color: #1f2937;
          border: 2px solid transparent;
          border-radius: 1.5rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          backdrop-filter: blur(4px);
          transition: all 0.2s ease;
        }

        .date-input:focus {
          outline: none;
          border-color: #0891b2;
          box-shadow: 0 0 0 4px rgba(8,145,178,0.2);
        }

        .date-input.error {
          border-color: #ef4444;
        }

        .input-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 1.5rem;
          height: 1.5rem;
          color: #6b7280;
          pointer-events: none;
        }

        .error-text {
          color: #fecaca;
          font-size: 0.875rem;
          text-align: center;
          margin: 0.5rem 0 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .cta-button {
          margin-top: 1.5rem;
          padding: 1rem 2rem;
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
         background: #028bcc;
          border: none;
          border-radius: 1.5rem;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(6,182,212,0.3);
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(6,182,212,0.4);
          background: linear-gradient(to right, #0891b2, #0d9488);
        }
         
        @media (max-width: 480px) {
          .greeting-text { font-size: 2.3rem; }
          .agent-name { font-size: 2.3rem; }
          .hero-card { height: 65vh; min-height: 460px; }
          .card-content { padding: 0.8rem 1.5rem 1.5rem 1.5rem; }
        }
      `}</style>
    </>
  );
 }   







