import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
/**
 * Verify an order by ID.
 */
export const VERIFY_ORDER = async (
  id: string,
  data: {
    charge_account: string;
    charge_password?: string;
    charge_game?: string;
    charge_region?: string;
    charge_server?: string;
    charge_type?: string;
  }
): Promise<{
  success: boolean;
  message: string;
  data?: {
    country: string;
    paymentChannel: string;
    productName: string;
    username: string;
    chargeAccount: string;
    usernameImage: string;
  };
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/topup/main/v1/order/verify/${id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        data: data,
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "VERIFY_ORDER",
        timeout: 20000,
        logger(data) {
          if (config.logger) {
            console.log(data);
            console.log(JSON.stringify(data));
          }
        },
      }
    );
    return res;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default {
  VERIFY_ORDER,
};
