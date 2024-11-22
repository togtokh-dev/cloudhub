import auth from "./auth";
import product from "./product";
import item from "./item";
import order from "./order";
// Configuration object for CloudHub with initial default values
export const config: {
  token: string;
  host: string;
  logger: boolean;
  auth: {
    email: string;
    password: string;
  };
} = {
  token: "", // Authorization token
  host: "", // API host URL
  logger: false, // Logger toggle
  auth: {
    email: "", // Username/email for authentication
    password: "", // Password for authentication
  },
};

// Function to set the host URL for API requests
const setHost = async (url: string) => {
  config.host = url;
  console.log("Set hosted");
};

// Function to enable or disable logging
const setLogger = async (status: boolean) => {
  config.logger = status;
  console.log("Set status");
};

// Main CloudHub object that exposes core functionalities
const CloudHub = {
  auth,
  product,
  config,
  setHost,
  setLogger,
  item,
  order,
};

export default CloudHub;
