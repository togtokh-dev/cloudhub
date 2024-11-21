export type ItemT = {
  // Default fields
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  // Custom fields
  id: string;
  product_id: string;
  name: string;
  face_value: number;
  item_type: "Card code" | "Direct charging";
  sales_price: number;
  sales_currency: "USD";
  price: number;
  currency: "MNT";
  profit: number;
  price_none_profit: number;
  charge_template: {
    charge_field_name: string;
    alias: string;
    placeholder: string;
    sortord: number;
    type: "options" | "text";
    options: {
      id: number;
      name: string;
      parent_id: number;
    }[];
  }[];
  active: boolean;
};

export type ProductT = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  active: boolean;
};
