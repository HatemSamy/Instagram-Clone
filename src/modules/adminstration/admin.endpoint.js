import { roles } from "../../middleware/auth.js";

 export const endpoint= {

   getusers :[roles.Admin],
   ChangeRole :[roles.Admin],
   Blockuser :[roles.Admin]



 }
 export default endpoint