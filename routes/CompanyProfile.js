const router = require("express").Router();
const companyModel = require("../models/CompanyProfile");

// creating profile
router.post("/addProfile", async (req, res) => {
  const create = new companyModel(req.body);
  try {
    const profile = await create.save();
    res.status(200).json(profile);
  } catch (error) {
    res.status(250).json(error);
  }
});

module.exports = router;
