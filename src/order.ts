import CloudHub, { config } from ".";
import { getToken } from "./auth";
import { axiosMasterMain } from "axios-master";
import { ItemT, OrderT } from "./type";
const queryparam = (data: { [key: string]: any }): string => {
  return Object.keys(data)
    .filter((key) => data[key] !== undefined && data[key] !== null)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
};
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
  },
): Promise<{
  success: boolean;
  message: string;
  data?: {
    country: string;
    username: string;
    info: string;
    channel: string;
    productName: string;
    image: string;
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
      },
    );
    return res;
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const ORDERS = async (data: {
  page?: string;
  limit?: string;
  status?:
    | "created"
    | "paid"
    | "pending"
    | "success"
    | "failed"
    | "refund"
    | "payment-failed";
}): Promise<{
  success: boolean;
  message: string;
  data?: {
    orders: OrderT[];
    total: number;
    page: number;
    limit: number;
  };
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/order/?${queryparam(data)}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "ORDERS",
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
export const ORDER_DETAILS = async (
  id: string,
): Promise<{
  success: boolean;
  message: string;
  data?: OrderT;
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "GET",
        url: `${config.host}/topup/main/v1/order/details/${id}`,
        headers: {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        },
      },
      {
        shouldRetry: true,
        shouldRetryStatus: [400, 401],
        retryFunction: getToken,
        name: "ORDER_DETAILS",
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
export const CREATE_ORDER = async (data: {
  item_id: string;
  buy_num: number;
  callback: string;
  order_id: string;
  info: {
    charge_account?: string;
    charge_password?: string;
    charge_game?: string;
    charge_region?: string;
    charge_server?: string;
    charge_type?: string;
    role_name?: string;
    contact_phone?: string;
    contact_qq?: string;
    buyer_ip?: string;
  };
}): Promise<{
  success: boolean;
  message: string;
  data?: OrderT;
}> => {
  try {
    const res = await axiosMasterMain(
      {
        method: "POST",
        url: `${config.host}/topup/main/v1/order/create`,
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
        name: "CREATE_ORDER",
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
  VERIFY_ORDER,
  ORDERS,
  ORDER_DETAILS,
  CREATE_ORDER,
};
