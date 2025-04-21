import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";

/**
 * Get BALANCE
 */
export const BALANCE = async (): Promise<{
  success: boolean;
  message: string;
  data?: {
    wallet_balance: number;
    wallet_type: "MERCHANT";
  };
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/auth/v1/merchant/balance`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "BALANCE",
        timeout: 20000,
        logger(data) {
          if (config.logger) {
            console.log(data);
            console.log(JSON.stringify(data));
          }
        },
      },
    );
    return res;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default {
  BALANCE,
};
