import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
import { ItemT } from "./type";
/**
 * Get all items.
 */
const GET_ALL_ITEMS = async (): Promise<{
  success: boolean;
  message: string;
  data?: ItemT[];
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/item`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_ALL_ITEMS",
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
 * Get item info by ID.
 */
const GET_ITEM_INFO = async (
  id: string
): Promise<{ success: boolean; message: string; data?: ItemT }> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/item/${id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_ITEM_INFO",
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
 * Get group info by item ID.
 */
const GET_ITEM_GROUP_INFO = async (
  id: string
): Promise<{ success: boolean; message: string; data?: ItemT[] }> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/item/${id}/product`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_ITEM_GROUP_INFO",
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
export default { GET_ALL_ITEMS, GET_ITEM_INFO, GET_ITEM_GROUP_INFO };
