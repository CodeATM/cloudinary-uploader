import React from 'react'
import c from 'clsx'
import svg from '../../../public/background.svg'
import {DropzoneInputProps} from 'react-dropzone'
import Image from 'next/image'

type DropZoneProps = {isActive?: boolean;
onInputProps: <T extends DropzoneInputProps>(props?: T) => T}

const DropZone = ({isActive = false, onInputProps}: DropZoneProps ) => {
  return (
    <div className={c('w-full sm:w-[338px] sm:h-[220px] relative transition-colors p-5 sm:p-0 flex flex-col justify-center items-center gap-4 sm:gap-10 border-2 border-dashed rounded-xl overflow-hidden', isActive? 'border-gray-600 bg-gray-200': 'border-gray-800 bg-slate-50')}>

      <input {...onInputProps()} />

      <div className="relative w-[115px] h-[88px]">
        <Image src={svg} fill alt='bg' priority className='w-full h-full object-cover'/>
      </div>

      <p className={c('text-xs sm:text-sm font-medium text-center', isActive? 'text-pink-400': 'text-gray-400')}>
        Drag your images here
      </p>

    </div>
  )
}

export default DropZone