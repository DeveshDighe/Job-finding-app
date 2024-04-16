import React, { useEffect } from 'react';
import { api } from '../Configer/config';
import { useDispatch, useSelector } from 'react-redux';
import { addUserJobApplication } from '../Toolkit/Reducers/userJobAppliedApp';
import { BounceLoader } from 'react-spinners';

const AppliedJob = () => {
  const userJobApp = useSelector((state) => state.userJobAppliedApp.userApplications);
  const dispatchR = useDispatch();

  const getAppliedJobs = async () => {
    try {
      const response = await api.get('applicant/get-applied-job');
      console.log(response.data.allAplliedData, 'appliedJobData');
      dispatchR(addUserJobApplication(response.data.allAplliedData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Applied Jobs</h1>
      {userJobApp?.length < 1 ? (
        <div className='w-full h-[600px] flex justify-center items-center'>
          <BounceLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userJobApp?.map((job) => (
            <div key={job._id} className="border rounded p-4 shadow-md w-full gap-y-5 flex flex-col cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 text-center">{job.jobCategory}</h2>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Job Types:</strong> {job.jobTypes}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Skills Have:</strong> {job.skillsHave}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Education Have:</strong> {job.educationHave}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Experience Have:</strong> {job.experienceHave}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Salary Expectation:</strong> {job?.salaryExpectation}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Applicant Vision:</strong> {job.applicantVision}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Status:</strong> {job.status}</p>
              {(job.rejectReason && job.rejectReason !== '') && (
                <p className="text-gray-600 mb-2"><strong>Reject Reason:</strong> {job.rejectReason}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default AppliedJob;
