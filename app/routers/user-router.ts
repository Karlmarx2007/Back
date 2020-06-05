import { Router } from 'express';
import User from '../models/user';
import { getToken } from '../utils';
import bcrypt from 'bcrypt';

export const userRouter = Router();

userRouter.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const signInUser = await User.findOne({
    email
  });

  if (!signInUser) {
    return res.status(404).send(`user with email ${email} not found`);
  }

  const match = await bcrypt.compare(password, signInUser.hash);
  if (match) {
    res.send({
      ...signInUser,
      token: getToken(signInUser)
    })
  }
  else {
    res.status(401).send('invalid email or password');
  }
});

userRouter.post('/signup', async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  if (!name) {
    return res.status(400).send('Please enter name');
  }
  if (!email) {
    return res.status(400).send('Please enter email');
  }
  if (!password) {
    return res.status(400).send('Please enter password');
  }
  if (!repeatPassword) {
    return res.status(400).send('Please re-enter Password');
  }
  if (password !== repeatPassword) {
    return res.status(400).send('Passwords don\'t match');
  }
  const existUser = await User.findOne({ email });
  
  if (existUser) {
    return res.status(403).send({error: `user with email ${email} already exists`});
  }
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  const signUpUser = new User({ name, email, hash, isAdmin: false });
  try {
    const newUser = await signUpUser.save();
    res.send({ ...newUser, token: getToken(newUser) });
  } catch (error) {
    res.status(401).send({error: error});
  }
})

userRouter.get('/createadmin', async (req, res) => {
  const password = 'karlito';
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  
  try {
    const user = new User({
      name: 'Karl',
      email: 'kmatuke@gmail.com',
      hash,
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send(error);
  }

})
