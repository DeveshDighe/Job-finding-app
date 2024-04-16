import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../Configer/config';
import { addJobApplication } from '../../Toolkit/Reducers/allJobAppications';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';


const GetAllJobApplication = () => {
  const AllApplications = useSelector((state) => state.allJobAppications.AllApplications);
  const dispatchR = useDispatch();

  console.log(AllApplications, 'JobAppaLL');
  const navigate = useNavigate()

  const getAppliedJobs = async () => {
    try {
      const response = await api.get('admin/get-all=applications');
      console.log(response.data.allAplliedData, 'appliedJobData all USERS');
      dispatchR(addJobApplication(response.data.allAplliedData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (id) => {
    navigate(`/singleapplication/${id}`)
  }

  useEffect(() => {
    getAppliedJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">All Job Applications</h1>
      {AllApplications?.length < 1 ? (
        <div className='w-full h-[600px] flex justify-center items-center'>
          <BounceLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {AllApplications?.map((job) => (
            <div key={job._id} onClick={() => handleClick(job._id)} className="border rounded p-4 shadow-md w-full gap-y-3 flex flex-col cursor-pointer">
              <h2 className="text-xl font-semibold mb-2 text-center">{job.jobCategory}</h2>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Applicant Name:</strong> {job.user.name}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Applicant Email:</strong> {job.user.email}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Job Types:</strong> {job.jobTypes}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Skills Have:</strong> {job.skillsHave}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Education Have:</strong> {job.educationHave}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Experience Have:</strong> {job.experienceHave}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Salary Expectation:</strong> {job?.salaryExpectation}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Applicant Vision:</strong> {job.applicantVision}</p>
              <p className="text-gray-600 mb-2"><strong className='mr-2'>Status:</strong> {job.status}</p>
              {job.rejectReason && job.rejectReason !== '' && (
                <p className="text-gray-600 mb-2"><strong className='mr-2'>Reject Reason:</strong> {job.rejectReason}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default GetAllJobApplication;
