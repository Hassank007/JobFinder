import Image from 'next/image'
import { useState } from 'react';

const EmployeeImage = ({w,h}) => {
  const CONSTANT_IMAGE_URL = 'https://xsgames.co/randomusers/avatar.php?g=male';
  

 const imageUrl= CONSTANT_IMAGE_URL;
    return (
    <>
<Image width={w} height={h} className='flex rounded-full' src={imageUrl} alt="Image by me"/>
    </>
  )
}

export default EmployeeImage