import { Category, Image, Product, Size } from "@prisma/client";
import { create } from "zustand";


interface ProductInterface extends Product {
    images: Image[];
    category:Category
    size:Size
  }

interface PreviewModalStore{
    isOpen:boolean;
    data?:ProductInterface;
    onOpen:(data:ProductInterface)=>void;
    onClose:()=>void
}

const usePreviewModal=create<PreviewModalStore>((set)=>({
    isOpen:false,
    data:undefined,
    onOpen:(data:ProductInterface)=>set({data:data,isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default usePreviewModal