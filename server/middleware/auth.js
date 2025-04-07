import jwt from "jsonwebtoken";
import Employee from "../models/Employee";

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findOne({
      _id: decoded.userId,
      isDeleted: false,
    });

    if (!employee) throw new Error();

    req.user = employee;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
};
