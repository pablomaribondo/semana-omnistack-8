const axios = require("axios");

const Dev = require("../models/Dev");

module.exports = {
  async store(request, response) {
    const { username } = request.body;

    const user = await Dev.findOne({ user: username });

    if (user) {
      return response.json(user);
    }

    const githubResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = githubResponse.data;

    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar,
    });

    return response.json(dev);
  },
};
