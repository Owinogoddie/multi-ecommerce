"use client"

import * as React from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Store } from "@prisma/client"
import { useModalStore } from "@/hooks/use-store-modal"
import { useParams, useRouter } from "next/navigation"



interface SwitcherProps{
    items?:Store[]
}
export function StoreSwitcher({items=[]}:SwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  
  const storeModal=useModalStore()
  const params=useParams()
  const router=useRouter()
  
  const formattedItems=items.map(item=>({
      label:item.name,
      value:item.id
    }))
    const currentStore=formattedItems.find(item=>item.value===params.storeId)

//   React.useEffect(()=>{
//     router.push(`${value}`)
//   },[value])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? formattedItems.find((item) => item.value === value)?.label
            : currentStore?.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {formattedItems.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  router.push(`/store/${item.value}`)
                  setOpen(false)

                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup>
            <CommandItem onSelect={()=>{
                setOpen(false)
                storeModal.onOpen()

            }}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create Store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
