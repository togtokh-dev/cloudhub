import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
import { ProductT } from "./type";

/**
 * Get all products.
 */
const GET_ALL_PRODUCTS = async (): Promise<{
  success: boolean;
  message: string;
  data?: ProductT[];
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/product`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_ALL_PRODUCTS",
        timeout: 20000,
        logger(data) {},
      }
    );
    return res;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/**
 * Get product info by ID.
 */
const GET_PRODUCT_INFO = async (
  id: string
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/product/${id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_PRODUCT_INFO",
        timeout: 20000,
        logger(data) {},
      }
    );
    return res;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

/**
 * Get product info with additional items.
 */
const GET_PRODUCT_INFO_ADD_ITEM = async (
  id: string
): Promise<{ success: boolean; message: string; data?: any }> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/product/${id}/item`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "GET_PRODUCT_INFO_ADD_ITEM",
        timeout: 20000,
        logger(data) {},
      }
    );
    return res;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
