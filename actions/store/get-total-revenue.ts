import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {

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
    const totalRevenue = orders.reduce((total, order) => {
      const orderTotal = order.orderItems.reduce((orderSum, item) => {

        const itemPrice = item.product?.price;
        if (itemPrice !== undefined) {
          return orderSum + itemPrice.toNumber();
        }
        return orderSum;

      }, 0);
      return total + orderTotal;
    }, 0);
  
    return totalRevenue;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
 

  
};