import express from 'express';

const router = express.Router();

router.post('/sign-up', (req, res) => {
  res.status(200).send('signup');
});
router.post('/sign-in', (req, res) => {
  res.status(200).send('signin');
});
router.post('/sign-out', (req, res) => {
  res.status(200).send('signout');
});

export default router;
