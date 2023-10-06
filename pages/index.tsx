import React, { useEffect, useMemo, useState } from 'react';
import { Button, Stack, ChakraProvider } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const Playground = dynamic(() => import('../imports/aframe/playground'), { ssr: false })

export default function Page() {
  const [run, setRun] = React.useState(false);
  return (<ChakraProvider>
    {run ? <Playground /> :
      <Stack height="100vh" width="100vw" align="center" justify="center" backgroundColor="gray.50">
        <Button
          onClick={() => setRun(true)}
          colorScheme="blue"
          size="lg"
        >
          Run
        </Button>
      </Stack>
    }
  </ChakraProvider>);
}
