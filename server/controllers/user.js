import { createError } from "../error.js";
import User from "../models/Users.js";
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};
export const deleteuser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted!");
    } catch (err) {
      next(err);
    }
  } else {
    return next(createError(403, "You can update only your account!"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        subscribedUsers: req.params.id,
      },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {
        subscribers: 1,
      },
    });
    res.status(200).json("user Subscribed successfully!");
  } catch (error) {
    next(error);
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        subscribedUsers: req.params.id,
      },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: {
        subscribers: -1,
      },
    });
    res.status(200).json("user Subscribed successfully!");
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {
  try {
    console.log("testttt working");
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  try {
    console.log("testttt working");
  } catch (error) {
    next(error);
  }
};
