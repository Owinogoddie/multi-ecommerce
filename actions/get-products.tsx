import { Category, Image, Product, Size } from "@prisma/client";
import qs from "query-string";

const URL=`${process.env.NEXT_PUBLIC_URL}/api/products`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}

export interface ProductInterface extends Product {
    images: Image[];
    category:Category
    size:Size
  }

const getProducts = async (query: Query): Promise<ProductInterface[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: { 
      colorId: query.colorId,
      sizeId: query.sizeId,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(url);
  const data=await res.json()

  return data;
};

export default getProducts;