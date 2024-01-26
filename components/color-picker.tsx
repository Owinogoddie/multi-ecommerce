import { X } from 'lucide-react'
import { useState } from 'react'
import { ColorResult,SketchPicker } from 'react-color'

interface ColorPickerProps{
    onChange:(value:string)=>void
    onCancel:()=>void
    value:string    

}

export const ColorPicker = ({onChange,onCancel,value}:ColorPickerProps) => {
    const [color, setColor] = useState("#fffff")
    const handleComplete=(color:ColorResult)=>{
        setColor(color.hex)
        // console.log(color.hex)
        onChange(color.hex)
    }
  return (
    <div className="flex items-start">
        <SketchPicker
    color={color}
    onChangeComplete={handleComplete}
       />
       {/* <button type='button'  className="top-[-20px]" onClick={onCancel}>
        <X/>
       </button> */}
    </div>
  )
}
