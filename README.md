# verify-token

It's a simple package that exports a express middleware function called verifyJWT. Internally it uses `jsonwebtoken` and `dotenv`.

You can provide your secret in the `.env` file with variable name `SECRET`. The package will automatically pick it up and use it as your JWT secret.

The token should be stored in the cookie with key value `access-token`.

The result will be attached in `req.user`.

Or you can just recreate the below code inside your node project and avoid additional dependencies.

```js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function verifyJWT(req, res, next) {
  const accessToken = req.cookies["access-token"];

  if (!accessToken) {
    return res.status(401).send({ isLoggedIn: false });
  }

  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(401).send({ isLoggedIn: false });
    }
    req.user = user;
  });
  next();
}

export default verifyJWT;
```

Please, this was not intended for public use as it was developed as a side gig for my personal project.