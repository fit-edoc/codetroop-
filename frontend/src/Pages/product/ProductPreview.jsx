import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductPreview = () => {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const products = 
   [
    {
      "id": 1,
      "name": "Portable Gas Stove",
      "type": "kitchen_equipment",
      "description": "Compact propane stove for outdoor cooking",
      "price": 89.99,
      "essential": true,
      "image": "https://imgs.search.brave.com/ganWd6xvgIgUbvM8Atnl3AmkMh-dlAXnL8XmxHrgPSE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudGhkc3RhdGlj/LmNvbS9wcm9kdWN0/SW1hZ2VzL2YyMWI5/OTY2LWNiN2QtNGUx/Zi1hMjMzLTRmNjlm/ZjQyNGExZC9zdm4v/eHRyZW1lcG93ZXJ1/cy1jYW1waW5nLXN0/b3Zlcy05NTUwMy1o/MS02NF82MDAuanBn"
    },
    {
      "id": 2,
      "name": "Stainless Steel Prep Table",
      "type": "kitchen_equipment",
      "description": "Hygienic food preparation surface with storage",
      "price": 249.99,
      "essential": true,
      "image": "https://imgs.search.brave.com/3sdphz3EnHQxpYfvlLoErZtlJWzk-yJYLA1qxkF9sMI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFoQ0Z4MEJpOEwu/anBn"
    },
    {
      "id": 3,
      "name": "Umbrella with Base",
      "type": "other_equipment",
      "description": "Large market umbrella for shade and weather protection",
      "price": 129.99,
      "essential": false,
      "image": "https://imgs.search.brave.com/OIuI5m2svzy0MM30HYKRCAwxfgvPHv4A8IA6FfdXkfA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnNo/Z2Nkbi5jb20vNmQw/MDYzZjktMTNmNy00/OGU3LTg2NWYtYjQ0/N2Q5NmMyMDM4Ly0v/Zm9ybWF0L2F1dG8v/LS9wcmV2aWV3LzMw/MDB4MzAwMC8tL3F1/YWxpdHkvYmVzdC8"
    },
    {
      "id": 4,
      "name": "Food Grade Storage Containers",
      "type": "kitchen_equipment",
      "description": "Set of 10 airtight containers for ingredient storage",
      "price": 59.99,
      "essential": true,
      "image": "https://imgs.search.brave.com/eMORkSCp0LzMZ5Ccdz2DchdrzQjFJ0XKMeg6ZRJVuMA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vQWR2/Z2VhcnMtMzJvei1G/b29kLVN0b3JhZ2Ut/Q29udGFpbmVycy13/aXRoLUxpZHMtNDgt/U2V0cy1NZWFsLVBy/ZXAtQ29udGFpbmVy/cy1EZWxpLUNvbnRh/aW5lcnNfMGE0ODA4/MWYtMGU2ZS00NWYz/LWFkNTgtZjcyOWM4/OGNmNjNmLmEzZjk1/NmYxNDM3N2E5NzY4/ZmY4NDE1MmU0YTdj/Mzg2LmpwZWc_b2Ru/SGVpZ2h0PTU4MCZv/ZG5XaWR0aD01ODAm/b2RuQmc9RkZGRkZG"
    },
    {
      "id": 5,
      "name": "Mobile Cart with Wheels",
      "type": "other_equipment",
      "description": "Sturdy cart with locking wheels for easy transport",
      "price": 399.99,
      "essential": true,
      "image": "https://imgs.search.brave.com/VQr3CFaVyyfvzYY4iqeoZQB0XP-Iepy4EbQVWEZCM_U/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c3RhcGxlcy0zcC5j/b20vczcvaXMvaW1h/Z2UvU3RhcGxlcy9G/M0QwNUI3Ni0xQTVB/LTQzODAtQkI0MzVD/RjBFMEI0NDlBNl9z/Yzc_d2lkPTgwMCZo/ZWk9ODAw"
    },
    {
      "id": 6,
      "name": "LED Menu Board",
      "type": "other_equipment",
      "description": "Digital display for showing menu items and prices",
      "price": 199.99,
      "essential": false,
      "image": "https://imgs.search.brave.com/Z6OUw7NVD8ss4sKSJ22FAv2dw2MP_hlUxTwiKmSJ_AY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFXamREVWZmMkwu/anBn"
    }
  ]

 

  return (
    
 <div className='min-h-screen w-screen'> 

<div className='h-[90px] w-screen text-center '> <h1 className='text-[30px] font-serif capitalize'>products</h1></div>

<div className='min-h-[50vh] w-screen grid grid-cols-3 gap-4 p-4'>

    {products.map((item,idx)=>(
        <div className='h-[400px] w-[300px] shadow-[2px_6px_6px_0px_rgba(0,_0,_0,_0.1)] rounded-md  bg-slate-300 mx-auto'>
            <div className='h-[70%] w-full'> <img src={item.image} alt="" className='h-full w-full object-contain' /></div>
            <div className='h-[30%] w-full  flex justify-around items-center'>
                <h1>{item.name}</h1>
                <button className='px-2 py-2 bg-gradient-to-br from-purple-500 to-neutral-600 rounded-md text-white'>details</button>
            </div>
        </div>
    ))}
</div>

 </div>
  );
};

export default ProductPreview;