import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <section className="relative z-10 text-center py-24 px-4 bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">

        {/* Tagline Badge */}
        <span className="px-5 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm tracking-wide shadow-md">
          🇮🇳 India’s No. 1 Job Search Platform
        </span>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 tracking-tight">
          Find, Apply & <br />
          Land Your <span className="text-blue-700">Dream Job</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
          Explore thousands of job opportunities tailored just for you. Start your career journey today with trusted employers.
        </p>

        {/* Search Input */}
        <div className="flex items-center w-full sm:w-[70%] md:w-[60%] lg:w-[50%] mx-auto rounded-full bg-white/90 border border-gray-300 shadow-xl backdrop-blur-sm overflow-hidden transition-all duration-300 hover:ring-2 hover:ring-orange-400 focus-within:ring-2 focus-within:ring-orange-500">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-5 py-4 text-gray-700 text-sm sm:text-base bg-transparent outline-none"
          />
         <Button
  onClick={searchJobHandler}
  className="rounded-none rounded-r-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700 px-6 py-4 text-white transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400"
>
  <Search className="h-5 w-5 text-white" />
</Button>

         
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
