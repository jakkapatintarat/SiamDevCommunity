import React from 'react'
import isAuthenticated from '../../utils/AuthAPI'

export default function Homepage() {
  const isAuthenticatedUser = isAuthenticated();
  if(!isAuthenticatedUser) return <div>Access Denied</div>
  const products = [
    {
      id: 1,
      name: 'บทช่วยสอน React',
      color: 'ปูพื้นฐานกันหน่อยวัยรุ่น',
      price: '$10000',
      href: '#',
      imageSrc: 'https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png',
      imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
      id: 1,
      name: 'บทช่วยสอน React',
      color: 'ปูพื้นฐานกันหน่อยวัยรุ่น',
      price: '$10000',
      href: '#',
      imageSrc: 'https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png',
      imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
      id: 1,
      name: 'บทช่วยสอน React',
      color: 'ปูพื้นฐานกันหน่อยวัยรุ่น',
      price: '$10000',
      href: '#',
      imageSrc: 'https://miro.medium.com/v2/resize:fit:2000/1*y6C4nSvy2Woe0m7bWEn4BA.png',
      imageAlt: 'Hand stitched, orange leather long wallet.',
    },
  ]
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending products</h2>
     
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={product.href}>
                  <span className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          ))}
        </div>

    
      </div>
    </div>
  )
}
