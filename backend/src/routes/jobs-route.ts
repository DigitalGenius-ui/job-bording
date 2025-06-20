import route from "express";
import {
  createJob,
  getAllJobsHandler,
  getSingleJobsHandler,
  removeJobHandler,
  updateJobHandler,
} from "../controllers/jobs-controllers";

const router = route.Router();
router.post("/createJob", createJob);
router.get("/", getAllJobsHandler);
router.get("/:id", getSingleJobsHandler);
router.delete("/remove/:id", removeJobHandler);
router.put("/update/:id", updateJobHandler);

export default router;
