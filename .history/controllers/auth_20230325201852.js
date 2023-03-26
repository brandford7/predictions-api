const { BadRequestError } = require("../errors");

const login = (req, res) => {
  const { email, password } = req.body;

  //check if email or password field is not empty

  if (!email || !password)
        throw new BadRequestError("email and password fields cannot be empty");
    i
};

