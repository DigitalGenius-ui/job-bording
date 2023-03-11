// We are using express router, which helps us to manage the api routing files in more structured way.

const router = require('express').Router();
const jobs = require('../models/jobs');

router.post('/add', async (req, res) => {
  console.log(req.body);
  const {job_title, category, job_type, position_accross_globe, country, state, application_link_or_email, job_description, job_posted_before, email_id, company_name, company_hq, company_mission_vission, company_website, company_description} = req.body;
  try{
    const createJob = await jobs.create({job_title, category, job_type, position_accross_globe, country, state, application_link_or_email, job_description, job_posted_before, email_id, company_name, company_hq, company_mission_vission, company_website, company_description});
    console.log('Contacts created successfully', createJob);
  } catch(err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', msg: 'Job has been added'});
});

router.get('/all', async (req, res) => {
  let allJobs;
  try {
    allJobs = await jobs.find();
  } catch(err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', jobs: allJobs});
});

module.exports = router;