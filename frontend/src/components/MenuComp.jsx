import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  RadioGroup, Button,
} from '@chakra-ui/react'
import { useState } from 'react'

const PlacementVendas = ({ isOpen, onClose }) => {
  const [placement, setPlacement] = useState("")

  return (
    <>
      <RadioGroup defaultValue={placement} onChange={setPlacement}>
      </RadioGroup>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} closeOnOverlayClick={true}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton/>
          <DrawerHeader borderBottomWidth='2px'pb="10px" mb="10px">Menu</DrawerHeader>
          <DrawerBody display="flex" gap="5px" p="0" flexDir="column" >
              <Button p="30px 0 30px 0" border="1px solid lightgrey" borderRadius="0">HOME</Button>
              <Button p="30px 0 30px 0" border="1px solid lightgrey" borderRadius="0">AREA DE CADASTRO</Button>
              <Button p="30px 0 30px 0" border="1px solid lightgrey" borderRadius="0">REPOSITÓRIO NO GITHUB</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
export default PlacementVendas;
