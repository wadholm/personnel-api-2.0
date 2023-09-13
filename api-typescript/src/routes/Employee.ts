import express from "express";
import controller from "../controllers/Employee";

const router = express.Router();

router.get('/', controller.readAll);
router.post('/', controller.createEmployee);
router.get('/:email', controller.readEmployee);
router.patch('/:email', controller.updateEmployee);
router.delete('/:email', controller.deleteEmployee);

export = router;
