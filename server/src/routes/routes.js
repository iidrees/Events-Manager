/* Import dependency and module */
import express from 'express';
import { 
  UserSignup,
  UserSignin 
} from '../controllers/User';
import Admin from '../controllers/Admin';
import { 
  Event, 
  EventUpdate, 
  EventDelete, 
  GetEvent, 
  GetAllEvents 
} from '../controllers/Event';
import { 
  GetCenter, 
  GetAllCenters, 
  CenterDelete 
} from '../controllers/getCenters';
import Center from '../controllers/Center';
import ModifyCenter from '../controllers/ModifyCenter';
import UserValidator from '../middlewares/UserValidator';
import InputValidation from '../middlewares/InputValidation';
import auth from '../auth/auth';

// setup router
const router = express.Router();

// signup and login endpoints
router.post(
  '/users', 
  UserValidator.userSignUpInput,
  UserSignup.signUp
  );

router.post(
  '/users/login', 
  UserValidator.userSignInInput,
  UserSignin.signIn
);

// endpoint that is available to all users
router.get(
  '/centers/:centerId', 
  GetCenter.getCenter
);

router.get(
  '/centers', 
  GetAllCenters.getAllCenters
);


// jwt middleware to verify users trying to hit secure endpoints
router.use(auth.verifyUser);

// upgrade user role to admin role endpoint
router.put(
  '/users/admin/:userId', 
  Admin.upgradeUserRole
);

// Events endpoints
router.get(
  '/events/:eventId',
  GetEvent.getEvent
);
router.get(
  '/events', 
  GetAllEvents.getAllEvents
);
router.post(
  '/events/:centerId',
  InputValidation.eventInput,
  Event.postEvents
);
router.put(
  '/events/:eventId',
  InputValidation.eventInput,
  EventUpdate.updateEvent
);
router.delete(
  '/events/:eventId', 
  EventDelete.deleteEvent
);

// Centers endpoint
router.post(
  '/centers', 
  InputValidation.centerInput, 
  Center.addCenter
);

router.put(
  '/centers/:centerId',
  InputValidation.centerInput,
  ModifyCenter.editCenter
);

router.delete(
  '/centers/:centerId', 
  CenterDelete.deleteCenter
);

// router exported and made available to the server
export default router;
