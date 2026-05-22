import express from "express";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import validator from "validator";

import db from "../database_client.js";

const router = express.Router();

/*
 REGISTER
*/
router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      if (
        !validator.isEmail(email)
      ) {
        return res.status(400).json({
          message: "Invalid email",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          message:
            "Password must be at least 6 characters",
        });
      }

      const existingUser =
        await db("users")
          .where({ email })
          .first();

      if (existingUser) {
        return res.status(409).json({
          message:
            "Email already registered",
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const user = await db(
        "users"
      ).insert({
        name,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(201).json({
        accessToken: token,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Registration failed",
      });
    }
  }
);

/*
 LOGIN
*/
router.post(
  "/login",
  async (req, res) => {
    try {
      const { email, password } =
        req.body;

      if (!email || !password) {
        return res.status(400).json({
          message:
            "Email and password are required",
        });
      }

      const user = await db("users")
        .where({ email })
        .first();

      if (!user) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          message:
            "Invalid email or password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        accessToken: token,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Login failed",
      });
    }
  }
);

export default router;