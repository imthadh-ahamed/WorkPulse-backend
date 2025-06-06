import * as tenantService from "../../services/Tenant/tenantService.js";
import * as userService from "../../services/Employees/userService.js";
import sendInvitationEmail from "../../services/Employees/emailService.js";
import mongoose from "mongoose";

export const createOrganization = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { firstName, lastName, email, companyName, password } = req.body;

    // Create an initial employee record
    const initialEmployee = await userService.createInitialEmployee(
      {
        firstName,
        lastName,
        email,
        companyName,
        password,
        created: new Date(),
      },
      { session }
    );

    // Create a tenant record
    const tenant = await tenantService.createTenant(
      {
        companyName,
        email,
        subscription: "free",
        created: new Date(),
        createdBy: initialEmployee._id,
      },
      { session }
    );

    // Create a permanent employee record for the admin
    const admin = await userService.createEmployee(
      {
        tenantId: tenant._id,
        firstName,
        lastName,
        email,
        password,
        isAdmin: true,
        role: "Admin",
        created: new Date(),
        createdBy: initialEmployee._id,
      },
      { session }
    );

    // Delete the temporary employee record
    await userService.deleteInitialEmployee(initialEmployee._id, { session });

    // Generate an authentication token for the new admin
    const token = userService.generateAuthToken(admin);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with the created tenant, admin, and token
    res.status(201).json({ tenant, admin, token });
  } catch (error) {
    // Rollback the transaction
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ error: error.message });
  }
};

export const inviteEmployee = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const { email, role } = req.body;

    const employee = await userService.getEmployeeByEmail(email);

    if (employee) {
      return res
        .status(400)
        .json({ error: "This email already exists" });
    }

    const invitationToken = userService.generateInvitationToken();
    const tempEmployee = await userService.createTempEmployee({
      tenantId,
      email,
      role,
      invitationToken,
      created: new Date(),
      createdBy: req.user._id,
    });

    await sendInvitationEmail(tempEmployee.email, invitationToken);

    res.status(201).json(tempEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createOrganization,
  inviteEmployee,
};
