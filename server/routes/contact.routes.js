import express from 'express';
import * as contactCtrl from '../controllers/contact.controller.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', contactCtrl.getAllContacts);
router.get('/:id', contactCtrl.getContactById);
router.post('/', auth.requireSignin, auth.isAdmin, contactCtrl.createContact);
router.put('/:id', auth.requireSignin, auth.isAdmin, contactCtrl.updateContact);
router.delete('/:id', auth.requireSignin, auth.isAdmin, contactCtrl.deleteContact);

export default router;
