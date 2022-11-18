import '../styles/globals.css'
import { ChakraProvider, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import { FC } from 'react'
import theme from '../themes'
import Image from 'next/image'

const App : FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      {/* //the container will limit the width of one element */}
      <Container boxShadow='md' borderRadius={7} maxWidth={'container.xl'} padding='4' marginY={10} backgroundColor='gray.800' >
        <VStack marginBottom={10} borderRadius='9999' >
          <Image src="/react.svg" alt='logo'  width={150} height={150} />
          <Heading fontSize='3xl' fontWeight='light' color='white' >App Store</Heading>
          <Text fontSize='xs' textAlign='justify' color='white' >Builded on Next.js</Text>
        </VStack>
        <Component {...pageProps} />
      </Container>
    </ChakraProvider>
  )
}

export default App