import { Router } from 'express';
import User from '../models/user';
import { getToken } from '../utils';

export const userRouter = Router();

userRouter.post('/signin', async (req, res) => {
  const signInUser = await User.findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (signInUser) {
    res.send({
      ...signInUser,
      token: getToken(signInUser)
    })
  } else {
    res.status(401).send('invalid email or password');
  }
});

userRouter.post('/signup', async (req, res) => {
  console.log('called @@');
  console.log('req > ', req.body);
  const { name, email, password, repeatPassword } = req.body;

  if (!name) {
    res.status(400).send('Please enter name');
  }
  if (!email) {
    res.status(400).send('Please enter email');
  }
  if (!password) {
    res.status(400).send('Please enter password');
  }
  if (!repeatPassword) {
    res.status(400).send('Please re-enter Password');
  }
  if (password !== repeatPassword) {
    res.status(400).send('Passwords must match');
  }
  const existUser = await User.findOne({ email });
  
  if (existUser) {
    res.status(403).send({error: `user with email ${email} already exists`});
  }
  const signUpUser = new User({ name, email, password, isAdmin: false });
  try {
    const newUser = await signUpUser.save();
    res.send({ ...newUser, token: getToken(newUser) });
  } catch (error) {
    res.status(401).send({error: error});
  }
})

userRouter.get('/createadmin', async (req, res) => {
  try {
    const user = new User({
      name: 'Karl',
      email: 'kmatuke@gmail.com',
      password: 'karl7767',
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send(error);
  }

})
