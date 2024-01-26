import { Size } from "@prisma/client";

const URL=`${process.env.NEXT_PUBLIC_URL}/api/sizes`;

const getSizes = async (): Promise<Size[]> => {
  const res = await fetch(URL);
  const data=await res.json()

  return data;
};

export default getSizes;