import sendEmailHelper from "../helpers/email.helper.js";
import { usersRepository } from "../repositories/repository.js";

const updateUser = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const data = req.body;
    const { _id } = req.user;
    const response = await usersRepository.updateById(_id, data);
    res.status(200).json({ response, method, url });
  } catch (error) {
    next(error);
  }
};

const sendEmail = async (req, res, next) => {
  try {
    const { method, originalUrl: url } = req;
    const { email } = req.params
    await sendEmailHelper(email)
    res.status(200).json({ response: "Email sent!", method, url });
  } catch (error) {
    next(error);
  }
};

export { updateUser, sendEmail };
