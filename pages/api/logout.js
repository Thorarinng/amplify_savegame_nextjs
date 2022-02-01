import axios from "axios";
import cookie from "cookie";
import helper from "./helper";
import uri from "../../config/django";

/**
 * This sets `cookie` using the `res` object
 */

export default async (req, res) => {
  // We also have access to the tokens in the header
  const access = helper.getAccessToken(req);

  try {
    console.log("here-101");
    console.log(uri);
    await axios.post(`${uri}api/user/logout/`, req.body, {
      headers: {
        Authorization: `Bearer ${req.body.access}`,
      },
    });
    console.log("here-102");
    // Remove agreement
    helper.removeCookies(res);

    return res.status(200).json({ baba: uri });
  } catch (e) {
    console.log("Error: s-side");
    console.log(e);
    const response = e;
    return res.status(400).json({ response, uri });
  }
};
