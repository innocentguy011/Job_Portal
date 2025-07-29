import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">
          Latest & Top <span className="text-[#F83002]">Job Openings</span>
        </h2>
        <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
          Discover trending opportunities handpicked just for you. Apply to your dream job today!
        </p>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center text-gray-500 py-10">
            🚫 No Jobs Available at the moment. Please check back later.
          </div>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
