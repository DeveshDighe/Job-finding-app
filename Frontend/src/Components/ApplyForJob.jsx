import React, { useRef } from 'react';
import { api } from '../Configer/config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ApplyJobForm = () => {
  const jobCategoryRef = useRef(null);
  const jobTypesRef = useRef(null);
  const skillsHaveRef = useRef(null);
  const educationHaveRef = useRef(null);
  const experienceHaveRef = useRef(null);
  const applicantVisionRef = useRef(null);
  const salaryExpectationRef = useRef(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve values from refs
    const jobCategory = jobCategoryRef.current.value;
    const jobTypes = jobTypesRef.current.value;
    const skillsHave = skillsHaveRef.current.value;
    const educationHave = educationHaveRef.current.value;
    const experienceHave = experienceHaveRef.current.value;
    const applicantVision = applicantVisionRef.current.value;
    const salaryExpectation = salaryExpectationRef.current.value;

    const applicantData = { jobCategory, jobTypes, skillsHave, educationHave, experienceHave, applicantVision, salaryExpectation };

    // Do something with the form data, like submitting it to a backend
    console.log({
      jobCategory,
      jobTypes,
      skillsHave,
      educationHave,
      experienceHave,
      applicantVision,
      salaryExpectation
    });

    try {
      const response = await api.post('applicant/apply-job', applicantData);
      console.log(response, 'response');
      if (response.data.success) {
        toast.success(response.data.msg)
        navigate('/')
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-[30rem] mx-auto mt-16">
      <div className='mx-3'>
        <h1 className='text-center text-2xl my-8'>Apply for Job</h1>
        <div className="mb-4">
          <label htmlFor="jobCategory" className="block mb-2">Job Category</label>
          <input type="text" id="jobCategory" placeholder='Eg: Web-developer , UI/Ux Designer' ref={jobCategoryRef} className="w-full border rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="jobTypes" className="block mb-2">Job Types</label>
          <input type="text" id="jobTypes" placeholder='Eg: MERN, Frontend' ref={jobTypesRef} className="w-full border rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="skillsHave" className="block mb-2">Skills Have</label>
          <input type="text" id="skillsHave" placeholder='Your Skills' ref={skillsHaveRef} className="w-full border rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="salaryExpectation" className="block mb-2">Salary Expectation</label>
          <input type="text" id="salaryExpectation" placeholder='Your Salary Expectation' ref={salaryExpectationRef} className="w-full border rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="educationHave" className="block mb-2">Education Have</label>
          <input type="text" id="educationHave" placeholder='Your Education' ref={educationHaveRef} className="w-full border rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="experienceHave" className="block mb-2">Experience Have</label>
          <input type="text" id="experienceHave" ref={experienceHaveRef} placeholder='Your Experience' className="w-full border rounded py-2 px-3" />
        </div>
        <div className="mb-4">
          <label htmlFor="applicantVision" className="block mb-2">Applicant Vision</label>
          <textarea id="applicantVision" placeholder='Your Vision' ref={applicantVisionRef} className="w-full border rounded py-2 px-3"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </div>
    </form>
  );
};

export default ApplyJobForm;
