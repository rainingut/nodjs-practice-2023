import express from 'express';
import UserCtrl from '../controllers/users.controller.js'; 

const router = express.Router();

// sign up
router.post('/signup', UserCtrl.createUser );

// sign in
router.post('/signin', UserCtrl.findUser );

// verify
router.get('/userinfo', UserCtrl.getUserInfo  );


export default router;