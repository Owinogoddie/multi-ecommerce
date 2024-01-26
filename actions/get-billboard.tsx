import { Billboard } from "@prisma/client";

const URL=`${process.env.NEXT_PUBLIC_URL}/billboards`;

const getBillboard = async (id: string): Promise<Billboard> => {
    try {
      const res = await fetch(`${URL}/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching billboard:', error);
      throw error; // rethrow the error or handle it as needed
    }
  };
export default getBillboard  