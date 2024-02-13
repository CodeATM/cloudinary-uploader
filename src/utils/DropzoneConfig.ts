import axios from 'axios'

import type { DropzoneOptions } from 'react-dropzone';

type responseProps = {
    public_id: string
    secure_url: string
}

type UploadImageProp = {
    formData: FormData | null
}

export const UploadImage = async({formData}: UploadImageProp): Promise<responseProps> => {
   const {data} = await axios.request<responseProps> ({
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    url: process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || '',
    data: formData,
   })

   return {secure_url: data.secure_url, public_id: data.public_id}
}


export const DROPZONE_OPTIONS: DropzoneOptions = {
	accept: {
		'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
	},
	noClick: true,
	maxFiles: 1,
	maxSize: 11000000,
};