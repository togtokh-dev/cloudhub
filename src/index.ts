import auth from "./auth";

export const config: {
  token: string;
  host: string;
  auth: {
    email: string;
    password: string;
  };
} = {
  token: "",
  host: "",
  auth: {
    email: "", // username
    password: "", // password
  },
};
const setHost = async (url: string) => {
  config.host = url;
  console.log("Set hosted");
};
const CloudHub = {
  auth,
  setHost,
};
export default CloudHub;
