import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStoredJobApplication, saveJobApplication } from "../../utility/localstorage";

const JobDetails = () => {
    const jobs = useLoaderData();
    const {id} = useParams();
    const idInt = parseInt(id);
    const job = jobs.find(job => job.id === idInt);
    console.log(job);

    const handleApplyNow = () =>{
        
        const jobApplications = getStoredJobApplication();
        console.log(jobApplications);
        const match = jobApplications.find(jobId => jobId === idInt);
        console.log(match);
        if(match){
            toast("You already applied for this job!");
        }
        else{
            saveJobApplication(idInt);
            toast("You have applied successfully");
        }
    }

    return (
        <div>
            
            <div className="grid md:grid-cols-4 gap-4">
                <div className="border md:col-span-3">
                    <h2 className="text-4xl">Details coming here</h2>
                    <h1>Job Details of: {job.job_title}</h1>
                    <p>{job.company_name}</p>
                </div>
                <div className="border">
                    <h2 className="text-2xl">Side things</h2>
                    <button onClick={handleApplyNow} className="btn btn-primary w-full">Apply Now</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default JobDetails;