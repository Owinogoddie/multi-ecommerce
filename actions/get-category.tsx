
const URL=`${process.env.NEXT_PUBLIC_URL}/api/categories`;

const getCategory = async (id: string) => {
  const res = await fetch(`${URL}/${id}`);

  return await res.json();
};

export default getCategory;