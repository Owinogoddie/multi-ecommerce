import { Category } from "@prisma/client";


const getCategories = async (): Promise<Category[]> => {
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/categories`);
    
  const data=await res.json()
  return data
};

export default getCategories;