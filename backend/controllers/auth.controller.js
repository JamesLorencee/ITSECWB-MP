require("dotenv").config();
const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
  addToBlacklist,
} = require("../middleware/jwt");

exports.authenticateRoles = (req, res) => {
  const role = req.params.role;
  if (req.user.isAdmin ? "true" : "false" == role)
    return res.status(200).send(true);
  return res.status(200).send(false);
};

exports.logout = async (req, res) => {
  const token = req.cookies["authorization"];

  addToBlacklist(token)
    .then((val) => {
      if (!val) return res.status(403).json({ error: "invalid_token" });

      User.deleteRefreshToken(val).then(() => {
        res.cookie("authorization", "", {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        });
        res.sendStatus(204);
      });
    })
    .catch(() => {
      res.status(403).json({ error: "already_loggedout" });
    });
};

exports.token = async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken == null) {
    return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const storedRefreshToken = await User.getRefreshToken(user.userId);

    if (!storedRefreshToken.refreshToken) {
      return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
    }

    const match = await bcrypt.compare(
      refreshToken,
      storedRefreshToken.refreshToken
    );

    if (!match) {
      return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
    }

    const accessToken = generateAccessToken({
      email: user.email,
      userId: user.userId,
      isAdmin: user.isAmin, // This should be isAdmin, not isAmin
    });

    return res.status(200).json({
      accessToken: accessToken,
    });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
    } else {
      return res.status(401).json({ error: "invalid_token" }); // or use sendStatus(401)
    }
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.find(email);
    if (!user) return res.status(401).json({ message: "Invalid login." });
    if (!user.isActive)
      return res.status(401).json({ message: "Invalid login." });

    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) return res.status(401).json({ message: "Invalid login." });

    const userAccess = {
      email: user.email,
      userId: user.id,
      isAdmin: user.isAdmin,
    };

    const refreshToken = generateRefreshToken(userAccess);

    User.setLastLogin(userAccess.userId);
    User.updateRefreshToken(refreshToken, userAccess.userId)
      .then(() => {
        generateAccessToken(userAccess)
          .then((token) => {
            res.cookie("authorization", token, {
              httpOnly: true,
              secure: true,
              sameSite: "None",
            });
            jwt.verify(
              token,
              process.env.JWT_ACCESS_SECRET,
              (err, userValue) => {
                if (err) res.status(401).json({ error: err });

                return res.status(200).json(userValue);
              }
            );
          })
          .catch((err) => res.status(401).json({ error: err }));
      })
      .catch((err) => res.status(401).json({ error: err }));
  } catch (err) {
    res.status(500).json({ error: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phoneNumber = req.body.phone;
  const fileType = req.file.fileType;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(password, salt);
    const uuid = await User.getUUID();

    const user = {
      uuid: uuid,
      name: name,
      email: email,
      password: hashed,
      phoneNumber: phoneNumber,
      photoFileName: `${uuid}-${Date.now()}.${fileType}`,
    };

    await User.save(user);

    const filePath = path.join(__dirname, "../uploads", user.photoFileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.writeFile(filePath, req.file.buffer, (err) => {
      if (err) return res.status(500).json({ error: err });

      res.status(201).json({ message: "User registered!" });
    });
  } catch (err) {
    res.status(500).json({ message: "Signup Error", err: err });
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};
