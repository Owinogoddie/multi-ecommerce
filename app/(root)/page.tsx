import getProducts from '@/actions/get-products'
import Billboard from '@/components/frontend/billboard'
import { Container } from '@/components/frontend/container'
import ProductList from '@/components/frontend/product-list'
import React from 'react'

const HomePage = async() => {
  const id='8a93cc48-2a11-4633-8b58-39da748104ab'

  const colors=await fetch(`http://localhost:3000/api/billboards/${id}`)
  const billboard=await colors.json()

  const products = await getProducts({ isFeatured: true });


  return (
    <Container>

      <div className='space-y-10 pb-10'>
        <Billboard data={billboard}/>
      </div>
      <div className="flex flex-col">
        <ProductList title='Featured Products' items={products}/>
      </div>
    </Container>
  )
}

export default HomePage