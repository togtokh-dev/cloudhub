import axios from "axios";
import CloudHub, { config } from "./";

// Define the structure of the authentication response
type AuthResT = {
  success: boolean;
  message: string;
  token: string;
  data: any;
};

// Function to perform login and retrieve an authentication token
const LOGIN = async (body: {
  email: string;
  password: string;
}): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    // POST request to authenticate the user
    const res = await axios.post(
      `${config.host}/topup/auth/v1/merchant/login`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const auth: AuthResT = res.data;

    // Handle success or failure
    if (auth.success) {
      config.auth.email = body.email;
      config.auth.password = body.password;
      console.log("SUCCESS");
      config.token = auth.token;
      return { success: true, message: "success" };
    } else {
      return { success: false, message: auth.message };
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return {
      success: false,
      message: error?.response?.data?.message || "error",
    };
  }
};

// Retrieve a new authentication token using saved credentials
export const getToken = async (): Promise<string> => {
  try {
    const res = await axios.post(
      `${config.host}/topup/auth/v1/merchant/login`,
      config.auth,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const auth: AuthResT = res.data;

    if (auth.success) {
      config.token = auth.token;
      return auth.token;
    } else {
      console.log("FAILED", auth);
      return "";
    }
  } catch (error) {
    console.log("FAILED", error?.response?.data);
    return "";
  }
};

export default { LOGIN };
