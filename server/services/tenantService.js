import Tenant from "../models/Tenant.js";

export const createTenant = async (tenantData) => {
  const tenant = new Tenant(tenantData);
  return await tenant.save();
};
