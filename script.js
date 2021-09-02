document.querySelector('.button-container').addEventListener('click', () =>{
    let text = document.getElementById('filter-jobs').value;
    console.log(text, 'we got it');

    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        // console.log(filteredJobs)
        showJobs(filteredJobs)
    })
})

function getJobs(){                   // first function
    return fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
}


function filterJobs(jobs, text){
    if(text){
        let filteredJobs = jobs.filter(job =>{
            if(job.roleName.toLowerCase().includes(text) || 
               job.type.toLowerCase().includes(text) ||
               job.company.toLowerCase().includes(text) ||
               job.requirements.content.toLowerCase().includes(text)){
                   return true;
               }else {return false;
            }
        })
        return filteredJobs;     // if searchText is there then return filtered jobs otherwise show jobs
    }else {
        return jobs
    }

}
                                        // third function happens
function showJobs(jobs){
    // console.log('jobs in showJobs', jobs);
    let jobsContainer  = document.querySelector('.jobs-container');
    // console.log(jobsContainer);
    let jobsHTML = "";
    jobs.forEach(job => {
        jobsHTML += `
       
            <div class="job-tile">
               <div class="top">
                   <img src="${job.logo}" />
                
               </div>

               <div class="rolename">
                    <span>${job.roleName}</span>
               </div>
                
               <div class="description">
                   <span>
                     ${job.requirements.content}
                   </span>
               </div>

            <div class="buttons">
                <div class="button apply-now">Apply Now</div>
                <div class="button">
                   Message
                </div>
            </div>
            </div>

           
        `
    });
    // console.log(jobsHTML);
    jobsContainer.innerHTML = jobsHTML;
}


// when the application is loaded     /// second function
getJobs().then(data => {    
    showJobs(data);
})

