import { roles } from "../../middleware/auth.js";


export const accessRole ={

  addpost:[roles.user,roles.Admin],
  like:[roles.user,roles.Admin],
  unlike:[roles.user,roles.Admin],

}
