import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
import { ItemT, ProductAddItemT, RegionT } from "./type";

/**
 * Get all region.
 */
export const GET_ALL_REGIONS = async (): Promise<{
  success: boolean;
  message: string;
  data?: RegionT[];
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/region`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_ALL_REGIONS",
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
 * Get region info by ID.
 */
export const GET_REGION_INFO = async (
  id: string
): Promise<{ success: boolean; message: string; data?: RegionT }> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/region/${id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_REGION_INFO",
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
  GET_ALL_REGIONS,
  GET_REGION_INFO,
};
