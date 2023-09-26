import { useLoaderData } from "react-router-dom";
import { getStoredJobApplication } from "../../utility/localstorage";
import { useEffect, useState } from "react";


const AppliedJobs = () => {
    const jobs = useLoaderData();
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [displayJobs, setDisplayJobs] = useState([]);

    const handleJobsFilter = (filter) => {
        if(filter === 'all'){
            setDisplayJobs(appliedJobs);
        }
        else if(filter == 'remote'){
            const remoteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Remote');
            setDisplayJobs(remoteJobs);
        }
        else if(filter === 'onsite'){
            const onsiteJobs = appliedJobs.filter(job => job.remote_or_onsite === 'Onsite');
            setDisplayJobs(onsiteJobs);
        }
    }

    useEffect(() => {
        const storedJobIds = getStoredJobApplication();
        if (jobs.length > 0) {
            // const jobsApplied = jobs.filter(job => storedJobIds.includes(job.id));

            const jobsApplied = [];
            for (const id of storedJobIds) {
                const job = jobs.find(job => job.id === id);
                if (job) {
                    jobsApplied.push(job);
                }
            }
            setAppliedJobs(jobsApplied);
            setDisplayJobs(jobsApplied);
            // console.log(jobsApplied);
        }
    }, [jobs]);


    return (
        <div>
            <h2 className="text-2xl">Jobs I applied for: {appliedJobs.length}</h2>

            <div className="flex justify-end">
                <details className="dropdown mb-32">
                    <summary className="m-1 btn">Filter By</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
                        <li onClick={() => handleJobsFilter('all')}><a>All</a></li>
                        <li onClick={() => handleJobsFilter('onsite')}><a>Onsite</a></li>
                        <li onClick={() => handleJobsFilter('remote')}><a>Remote</a></li>
                    </ul>
                </details>
            </div>

            <ul>
                {
                    displayJobs.map(job => <li key={job.id}>
                        <span>{job.job_title} {job.company_name} : {job.remote_or_onsite}</span>
                    </li>)
                }
            </ul>
        </div>
    );
};

export default AppliedJobs;