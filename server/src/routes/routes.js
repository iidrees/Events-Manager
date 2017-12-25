import express from 'express';
import { UserSignup, UserSignin } from '../controllers/users';
import { Event, EventUpdate, EventDelete, GetEvent, GetAllEvents } from '../controllers/events';
import Admin from '../controllers/admin';
import Center from '../controllers/AddCenters';
import EditCenter from '../controllers/editCenter';
import { GetCenter, GetAllCenters, CenterDelete } from '../controllers/getCenters';
import auth from '../auth/auth';

const router = express.Router();



router.post('/users', UserSignup.signUp);
router.post('/users/login', UserSignin.signIn);
router.get('/centers/:centerId', GetCenter.getCenter);
router.get('/centers', GetAllCenters.getAllCenters);

// jwt middleware to verify users trying to hit secure endpoints
router.use(auth.verifyUser);
router.get('/events/:eventId', GetEvent.getEvent);
router.get('/events', GetAllEvents.getAllEvents);
router.post('/events/:eventId', Event.postEvents);
router.put('/events/:eventId', EventUpdate.updateEvent);
router.delete('/events/:eventId', EventDelete.deleteEvent);
router.put('/users/admin/:userId', Admin.addAdmin);
router.post('/centers', Center.addCenter);
router.put('/centers/:centerId', EditCenter.editCenter);
router.delete('/centers/:centerId', CenterDelete.deleteCenter);


export default router;
