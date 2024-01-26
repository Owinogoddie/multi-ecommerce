import prismadb from "@/lib/prismadb";

export const getSalesCount = async (storeId: string) => {

    try {
        const orders = await prismadb.order.count({
          where: {
            isPaid:true,
            orderItems: {
              some: {
                product: {
                  storeId:storeId,
                },
              },
            },
          }
        });
       
      
        return orders;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }