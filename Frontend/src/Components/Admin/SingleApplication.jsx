import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../Configer/config';
import toast from 'react-hot-toast';
import { BounceLoader } from 'react-spinners';

const SingleApplication = () => {
  const { id } = useParams();
  const [singleApplication, setSingleApplication] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectClicked, setRejectClicked] = useState(false);
  const reasonInputRef = useRef(null);

  const getSingleApplication = async () => {
    try {
      const response = await api.post('admin/get-single-application', { id });
      console.log(response.data, 'response');
      setSingleApplication(response.data.singleAppication);
    } catch (error) {
      console.error('Error fetching single application:', error);
    }
  };

  const handleReject = async () => {
    const rejetctData = { id, rejectReason : reasonInputRef.current.value }
    try {
      console.log(rejectReason , 'rejectreason');
      const response = await api.patch('admin/application-reject',rejetctData );
      if (response.data.success) {
        toast.success('Application rejected');
        setSingleApplication(response.data.appication);
        setRejectClicked(false); // Reset rejectClicked state
        setRejectReason(''); // Reset rejectReason state
      }
      console.log(response.data, 'reject-response');
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  const handleAccept = async () => {
    try {
      const response = await api.patch('admin/application-accept', { id });
      console.log(response.data, 'accept-response');
      if (response.data.success) {
        toast.success('Application Accepted');
        setSingleApplication(response.data.appication);
      }
    } catch (error) {
      console.error('Error accepting application:', error);
    }
  };

  useEffect(() => {
    getSingleApplication();
  }, [id]);

  const handleRejectClick = () => {
    setRejectClicked(true);
  };

  const handleRejectFormSubmit = (event) => {
    event.preventDefault();
    // Handle the submission of reject reason
    console.log(reasonInputRef.current.value);
    setRejectReason(reasonInputRef.current.value);
    handleReject(); // Call the reject handler
  };

  if (!singleApplication) {
    return <div className='w-full h-[600px] flex justify-center items-center'>
          <BounceLoader color="#36d7b7" />
        </div>; // Show loading indicator while fetching data
  }

  return (
    <div>
  <div className="container mx-auto px-4 py-8">
      <div className=" flex justify-center max-w-[900px] m-auto">
        <div className="border rounded p-4 shadow-md w-full gap-y-5 flex  flex-col cursor-pointer">
          <h2 className="text-xl font-semibold mb-2 text-center">{singleApplication?.jobCategory}</h2>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2'>Applicant Name :</strong> {singleApplication?.user.name}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Applicant Email :</strong> {singleApplication?.user.email}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Job Types :</strong> {singleApplication?.jobTypes}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Skills Have :</strong> {singleApplication?.skillsHave}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Education Have :</strong> {singleApplication?.educationHave}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Experience Have :</strong> {singleApplication?.experienceHave}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Salary xpectation :</strong> {singleApplication?.salaryExpectation}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Applicant Vision :</strong> {singleApplication?.applicantVision}</p>
          <p className="text-gray-600 mb-2"><strong className = 'mr-2 '>Status :</strong> {singleApplication?.status}</p>
          {singleApplication.rejectReason && singleApplication.rejectReason !== '' ? (
            <p className="text-gray-600 mb-2"><strong>Reject Reason :</strong> {singleApplication.rejectReason}</p>
        ) : (
          <div className="my-8 flex justify-between">
            <button onClick={handleRejectClick} className="py-1 px-3 bg-red-500 text-white">Reject</button>
            <button onClick={handleAccept} className="py-1 px-3 bg-green-500 text-white">Accept</button>
          </div>
        )}
        {rejectClicked && (
          <form onSubmit={handleRejectFormSubmit}>
            <div className="mb-4">
              <label htmlFor="rejectReason" className="block text-gray-700">Reason for rejection:</label>
              <textarea
                id="rejectReason"
                className="form-textarea mt-1 block w-full border p-2"
                rows="3"
                placeholder='Reason for rejection:'
                ref={reasonInputRef}
                required
              ></textarea>
            </div>
            <button type="submit" className="py-2 px-4 bg-red-500 text-white">Submit Rejection</button>
          </form>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default SingleApplication;
