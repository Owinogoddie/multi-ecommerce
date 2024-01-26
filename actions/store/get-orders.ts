import prismadb from "@/lib/prismadb";

export const getStoreOrders = async (storeId: string) => {

  try {
    const orders = await prismadb.order.findMany({
      where: {
        isPaid:true,
        orderItems: {
          some: {
            product: {
              storeId:storeId,
            },
          },
        },
      },
      include: {
        orderItems: {
          where: {
            product: {
              storeId:storeId,
            },
          },
          include: {
            product: true, // Include associated product
          },
        },
      },
    });
  
  
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
 

  
};