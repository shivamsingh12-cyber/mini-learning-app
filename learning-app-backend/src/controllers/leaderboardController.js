const User = require('../models/User');

exports.getLeaderboard = async (req, res) => {
  const top = await User.find({ role: 'user' })
    .sort({ xp: -1 })
    .limit(10)
    .select('name email xp')
    .lean();

  res.json(top);
};
