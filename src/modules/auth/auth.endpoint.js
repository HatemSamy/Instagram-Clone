import { roles } from "../../middleware/auth.js";



export const endpoint = {
  logout:[roles.user,roles.HR,roles.Admin]




}