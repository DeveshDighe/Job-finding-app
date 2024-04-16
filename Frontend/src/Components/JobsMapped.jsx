import React, { useContext, useEffect } from 'react';
import { MyContext } from '../Context/AuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { addJobs } from '../Toolkit/Reducers/JobsReducer';
import { api } from '../Configer/config';
import { Link } from 'react-router-dom';
import {BounceLoader} from 'react-spinners'

const JobsMapped = () => {
  const jobs = useSelector((state) => state.JobsReducer.jobs);
  const dispatchR = useDispatch();

  const getJobs = async () => {
    try {
      console.log('Hit getJob');
      const response = await api.get('admin/get-job');
      dispatchR(addJobs(response.data.allJobs));
      console.log(response);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Jobs</h1>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
          {jobs.map((job) => (
            <div key={job._id} className="border rounded p-4 shadow-md w-full gap-y-3 flex  flex-col">
              <h2 className="text-xl font-semibold mb-4 text-center">{job.jobCategory}</h2>
              <p className="text-gray-600 mb-2"><strong>Job Types:</strong> {job.jobTypes}</p>
              <p className="text-gray-600 mb-2"><strong>Job Description:</strong> {job.jobDecription}</p>
              <p className="text-gray-600 mb-2"><strong>Experience Required:</strong> {job.experienceRequired}</p>
              <p className="text-gray-600 mb-2"><strong>Skills Required:</strong> {job.skillsRequired}</p>
              <p className="text-gray-600 mb-2"><strong>Education Required:</strong> {job.educationRequired}</p>
              <p className="text-gray-600 mb-2"><strong>Company:</strong> {job.companyName}</p>
              <p className="text-gray-600 mb-2"><strong>Company Started In:</strong> {job.companyStartedIn}</p>
              <p className="text-gray-600 mb-2"><strong>Company Vision:</strong> {job.companyVision}</p>
              <p className="text-gray-600 mb-2 mt-6 text-center">
                <Link to='/apply-for-job' className="py-1 px-4 bg-green-500 text-white rounded-md">APPLY</Link>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className='w-full h-[600px] flex justify-center items-center'>
          <BounceLoader color="#36d7b7" />
        </div>
      )}
    </div>
  );
};

export default JobsMapped;
