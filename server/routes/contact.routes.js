import express from 'express';
import authCtrl from "../controllers/auth.controller.js";
import {
  getAllContacts, getContactById,
  createContact, updateContact, deleteContact
} from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.post("/", authCtrl.requireSignin, createContact);
router.put("/:id", authCtrl.requireSignin, updateContact);
router.delete("/:id", authCtrl.requireSignin, deleteContact);

export default router;
