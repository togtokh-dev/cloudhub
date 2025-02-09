import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
import { ItemT, ProductAddItemT, GroupT } from "./type";

/**
 * Get all group.
 */
export const GET_ALL_GROUPS = async (): Promise<{
  success: boolean;
  message: string;
  data?: GroupT[];
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/group`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_ALL_GROUPS",
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

/**
 * Get group info by ID.
 */
export const GET_GROUP_INFO = async (
  id: string
): Promise<{ success: boolean; message: string; data?: GroupT }> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/group/${id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_GROUP_INFO",
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
  GET_ALL_GROUPS,
  GET_GROUP_INFO,
};
