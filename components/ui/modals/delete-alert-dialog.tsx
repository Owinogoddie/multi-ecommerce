import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteModalProps{
    isOpen:boolean
    onClose:()=>void
    onSubmit:()=>void
    disabled?:boolean
}

export const DeleteAlertModal = ({disabled=false,isOpen,onClose,onSubmit}:DeleteModalProps) => {
  
    const onChange=(isOpen:boolean)=>{
        if(!open){
            onClose()
        }
    }

    return (
    <AlertDialog open={isOpen}>
  {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={onClose} disabled={disabled}>Cancel</AlertDialogCancel>
      <AlertDialogAction disabled={disabled} onClick={(event: React.MouseEvent<HTMLButtonElement>): void => onSubmit()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  )
}
