import express from 'express';
import { 
  UserSignup,
  UserSignin 
} from '../controllers/User';
import { 
  Event, 
  EventUpdate, 
  EventDelete, 
  GetEvent, 
  GetAllEvents 
} from '../controllers/Event';
import Admin from '../controllers/Admin';
import Center from '../controllers/Center';
import ModifyCenter from '../controllers/ModifyCenter';
import { 
  GetCenter, 
  GetAllCenters, 
  CenterDelete 
} from '../controllers/getCenters';
import auth from '../auth/auth';

const router = express.Router();



router.post('/users', UserSignup.signUp);
router.post('/users/login', UserSignin.signIn);
router.get('/centers/:centerId', GetCenter.getCenter);
router.get('/centers', GetAllCenters.getAllCenters);

// jwt middleware to verify users trying to hit secure endpoints
router.use(auth.verifyUser);
// Events endpoints
router.get('/events/:eventId', GetEvent.getEvent);
router.get('/events', GetAllEvents.getAllEvents);
router.post('/events/:centerId', Event.postEvents);
router.put('/events/:eventId', EventUpdate.updateEvent);
router.delete('/events/:eventId', EventDelete.deleteEvent);

// Centers endpoint
router.put('/users/admin/:userId', Admin.addAdmin);
router.post('/centers', Center.addCenter);
router.put('/centers/:centerId', ModifyCenter.editCenter);
router.delete('/centers/:centerId', CenterDelete.deleteCenter);


export default router;
