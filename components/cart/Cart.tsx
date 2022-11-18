import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import { Product } from '../products/types'

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Flex,
    Text,
    Button,
    Box,
} from '@chakra-ui/react'

import { currencyParser } from '../cart'
import Link from 'next/link'
interface CartProps {
    products: Product[];
    total: string;
}


export const Cart: React.FC<CartProps> = ({ products, total }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [cart, setCart] = React.useState<Product[]>([])
    const [totalCart, setTotalCart] = React.useState<string>('')

    useEffect(() => {
        setCart(products)
        setTotalCart(total)
    }, [products])

    const deleteHandler = (id: number) => {
        const newProducts = cart.filter((product) => Number(product.id) !== id)
        if (newProducts.length === 0) {
            setCart([])
            return;
        }
        setTotalCart(currencyParser(newProducts.reduce((total, product) => Number(total + product.price), 0)));
        setCart(newProducts)
    }

    //only if cart changes will be re-rendered

    const text = useMemo(() =>
        cart
            .reduce(
                (msg, product) => msg.concat(`* ${product.title} - $ ${product.price}\n`), ``
            )
            .concat(
                `\nTotal: ${currencyParser(cart.reduce((total, product) => Number(total + product.price), 0))}`
            )
        , [cart]
    )
    
    const clearCart = () : void => {
        setCart([])
    }

    return (
        <>
            <Flex justifyContent='flex-end' maxWidth={'100px'} alignSelf='end' padding={5} cursor='pointer'  >
                <Image onClick={onOpen} src="/cart.svg" alt='cart' width={30} height={30} />
            </Flex>

            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader backgroundColor='gray.800' borderBottomWidth='1px' color='white'>Shop Cart</DrawerHeader>
                    <DrawerBody backgroundColor='gray.800' >
                        {
                            cart.map((product: Product) => (
                                <Flex key={product.id} gap={2} textAlign='left' justifyContent='space-between' alignItems='center' marginY={4} padding={0} >
                                    <Image src={product.images[0]} alt={product.title} width={50} height={50} />
                                    <Text color='white'  >{product.title}</Text>
                                    <Text color='white' >{currencyParser(product.price)}</Text>
                                    <Button onClick={() => deleteHandler(Number(product.id))} color='white' borderRadius='9999' marginLeft={3} colorScheme={'red'} paddingX={2} fontSize='2xs'>
                                        <Image src="/delete.svg" alt='trash' width={15} height={15} />
                                    </Button>
                                </Flex>
                            ))
                        }
                        {
                            Boolean(cart.length > 0) ? (
                                <>
                                    <Flex width='100%' justify='space-between' marginTop={4} paddingX={8} borderTop='1px solid white'>
                                        <Text color='white' textAlign='right' margin={2} fontWeight="semi-bold" paddingY={3}>Total:</Text>
                                        <Text color='white' textAlign='right' margin={2} fontWeight="bold" paddingY={3}> {totalCart} </Text>
                                    </Flex>
                                    <Flex alignSelf='center' margin={2} gap={4} padding={2}>
                                        <Button as={Link} padding={'3'}
                                             _hover={{ bg: 'blue.300' }} width={300} target="_blank" textAlign='center' color='white' fontWeight='bold' href={`https://wa.me/3546650023?text=${encodeURIComponent(text)}`}  marginX='auto' colorScheme='whatsapp' > Check out
                                        </Button>
                                        <Button padding={'3'}
                                             _hover={{ bg: 'gray.600' }} width={300}  textAlign='center' color='white' fontWeight='bold' variant='outline' onClick={clearCart}> Clear Cart
                                        </Button>
                                    </Flex>
                                </>
                            ) : <Text color='white' textAlign='center' margin={2} fontWeight="bold" paddingY={3}>Cart is empty</Text>
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
