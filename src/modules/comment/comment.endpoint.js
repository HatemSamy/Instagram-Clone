import { roles } from "../../middleware/auth.js";

export const endpoint =
{
addcomment:[roles.user,roles.Admin]

}
export default endpoint