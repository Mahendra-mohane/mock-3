const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already registered.' });
    }

    user = new User({
      name,
      email,
      password,
      isAdmin
    });

    // Hash password before saving to database (You may use a library like bcrypt for this)
    // user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(201).json({ message: 'Registration successful.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.secret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
