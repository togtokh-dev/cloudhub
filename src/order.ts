import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
/**
 * Verify an order by ID.
 */
const VERIFY_ORDER = async (
  id: string,
  chargeAccount: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/topup/main/v1/order/verify/${id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
        data: {
          charge_account: chargeAccount,
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "VERIFY_ORDER",
        timeout: 20000,
        logger(data) {},
      }
    );
    return res;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
