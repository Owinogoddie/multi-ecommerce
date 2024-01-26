import { ProductInterface } from "./get-products";

const URL=`${process.env.NEXT_PUBLIC_URL}/api/products`;

const getProduct = async (id: string): Promise<ProductInterface> => {
  const res = await fetch(`${URL}/${id}`);
  const data=await res.json()

  return data;
};

export default getProduct;