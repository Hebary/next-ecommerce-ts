import React, { useMemo, useState } from 'react';
import { GetStaticProps } from 'next';
import { Product } from '../components/products/types';
import api from '../components/products/api';
import Link from 'next/link';
import Image from 'next/image';
import { Grid, Text, Stack, Button, Box } from '@chakra-ui/react';
import { Cart } from '../components/cart';

import { currencyParser } from '../components/cart'

interface Props {
  products: {
    products: Product[];
  };
}


const IndexRoute: React.FC<Props> = ({ products }) => {

  const [cart, setCart] = useState<Product[]>([]);


  const addToCart = (product: Product) => {
    setCart(cart => cart.concat(product));
  }


  return (

    <Stack>
      <Cart
        products ={cart}
        total = {currencyParser(cart.reduce((total, product) => Number(total + product.price), 0))}
      />

      <Grid gridGap={5} justifyItems='center' templateColumns='repeat(auto-fill, minmax(200px,1fr))'>
        {
          products.products.map((product: Product) => (
            <Stack backgroundColor='gray.700' spacing={3} borderRadius={10} padding={4} key={product.id}>

              <Stack spacing='1'>
                <Text color='white' fontSize='xl' textAlign="center" fontWeight="light" >{product.title}</Text>
              </Stack>

              <Stack alignItems='center'>
                <Image src={product.images[0]} style={{objectFit:'cover', maxHeight:'128px'}}  alt={product.title} width={200} height={200} />
                <Text color='white' textAlign='left'>{product.description}</Text>
                <Text color='white' textAlign='center' fontWeight="bold">{currencyParser(product.price)}</Text>
              </Stack>

              <Stack>

                <Button
                  colorScheme='primary'
                  fontSize='sm'
                  onClick={() => addToCart(product)}
                  color='white'
                  size='sm'
                  _hover={{ bg: 'primary.500' }}
                  variant='outline'
                >
                  Add to Cart
                </Button>
              </Stack>

            </Stack>
          ))

        }
      </Grid>
      {/* 
        {
          Boolean(cart.length) &&
            <Button as={Link} padding={'6'}
              position='sticky' _hover={{ bg: 'teal'}} target="_blank" textAlign='center'  color='white' fontWeight='bold' href={`https://wa.me/3546650023?text=${encodeURIComponent(text)}`} width={300} marginX='auto' colorScheme='whatsapp' > Check out  {cart.length} items in cart
            </Button>
        }
      </Box> */}

    </Stack>
  );
}
export default IndexRoute

export const getStaticProps: GetStaticProps = async () => {
  const products: Product[] = await api.list()
  return {
    revalidate: 11,
    props: {
      products
    }
  }
}
