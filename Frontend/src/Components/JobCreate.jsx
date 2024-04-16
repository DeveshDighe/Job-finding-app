import React, { useRef } from 'react';
import { api } from '../Configer/config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const JobCreationForm = () => {
  const jobCategoryRef = useRef(null);
  const jobTypesRef = useRef(null);
  const jobDescriptionRef = useRef(null);
  const companyNameRef = useRef(null);
  const companyStartedInRef = useRef(null);
  const companyVisionRef = useRef(null);
  const skillsRequiredRef = useRef(null);
  const educationRequiredRef = useRef(null);
  const experienceRequiredRef = useRef(null);

  const navigate = useNavigate()

  const handleSubmit =async (e) => {
    e.preventDefault();

    // Retrieve values from refs
    const jobCategory = jobCategoryRef.current.value;
    const jobTypes = jobTypesRef.current.value;
    const jobDescription = jobDescriptionRef.current.value;
    const companyName = companyNameRef.current.value;
    const companyStartedIn = companyStartedInRef.current.value;
    const companyVision = companyVisionRef.current.value;
    const skillsRequired = skillsRequiredRef.current.value;
    const educationRequired = educationRequiredRef.current.value;
    const experienceRequired = experienceRequiredRef.current.value;

    const allJobData = {jobCategory, jobTypes, jobDescription, companyName, companyStartedIn, companyVision, skillsRequired, educationRequired, experienceRequired}

    // Do something with the form data, like submitting it to a backend
    console.log({
      jobCategory,
      jobTypes,
      jobDescription,
      companyName,
      companyStartedIn,
      companyVision,
      skillsRequired,
      educationRequired,
      experienceRequired,
    });

    try {
      const response = await api.post('admin/create-job',allJobData )
      console.log(response , 'response');
      if (response.data.success) {
        toast.success(response.data.msg)
        navigate('/')
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className=" max-w-[30rem] mx-auto mt-16">
      <div className=' mx-3'>
      <h1 className=' text-center text-2xl my-8'>Create Job</h1>
      <div className="mb-4">
        <label htmlFor="jobCategory" className="block mb-2">Job Category</label>
        <input type="text" id="jobCategory" placeholder='Eg: Web-developer , UI/Ux Designer' ref={jobCategoryRef} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="jobTypes" className="block mb-2">Job Types</label>
        <input type="text" id="jobTypes" placeholder='Eg: MERN, Frontend' ref={jobTypesRef} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="jobDescription" className="block mb-2">Job Description</label>
        <textarea id="jobDescription" placeholder='Job Detail' ref={jobDescriptionRef} className="w-full border rounded py-2 px-3"></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="companyName" className="block mb-2">Company Name</label>
        <input type="text" id="companyName" placeholder='Company Name' ref={companyNameRef} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="companyStartedIn" className="block mb-2">Company Started In</label>
        <input type="text" id="companyStartedIn" placeholder='Started In' ref={companyStartedInRef} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="companyVision" className="block mb-2">Company Vision</label>
        <textarea id="companyVision" placeholder='Eg: Vision' ref={companyVisionRef} className="w-full border rounded py-2 px-3"></textarea>
      </div>
      {/* <div className="mb-4">
        <label htmlFor="companyMission" className="block mb-2">Company Mission</label>
        <textarea id="companyMission" placeholder='Company Mission' ref={companyMissionRef} className="w-full border rounded py-2 px-3"></textarea>
      </div> */}
      <div className="mb-4">
        <label htmlFor="skillsRequired" className="block mb-2">Skills Required</label>
        <input type="text" id="skillsRequired" placeholder='Required Skills' ref={skillsRequiredRef} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="educationRequired" className="block mb-2">Education Required</label>
        <input type="text" id="educationRequired" placeholder=' Education Required' ref={educationRequiredRef} className="w-full border rounded py-2 px-3" />
      </div>
      <div className="mb-4">
        <label htmlFor="experienceRequired" className="block mb-2">Experience Required</label>
        <input type="text" id="experienceRequired" ref={experienceRequiredRef} placeholder='Experience Required' className="w-full border rounded py-2 px-3" />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
      </div>
    </form>
  );
};

export default JobCreationForm;
