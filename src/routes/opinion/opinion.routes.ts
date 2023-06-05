import { Router} from "express";
import getOpinionById from "./get-opinion.js";
import createOpinion from "./create-opinion.js";
import deleteOpinionById from "./delete-opinion.js";
import getOpinionByUser from "./get-opinion-user.js";
import getOpinionByRestaurant from "./get-opinion-restaurant.js";
import validateNewOpinion from "../../validators/opinion.validator.js";


const router = Router();

router.get('/opinion/:id', getOpinionById)
router.get('/opinion_restaurant/:id', getOpinionByRestaurant)
router.get('/opinion_user/:id', getOpinionByUser)
router.post('/opinion',validateNewOpinion, createOpinion);
router.delete('/opinion/:id', deleteOpinionById)

export default router