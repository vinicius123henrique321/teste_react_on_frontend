import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const ModalInfoVendas = ({ isOpen, onClose, sales }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Informações do Carro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p><strong>Cliente:</strong> {sales.cliente}</p>
          <p><strong>Carro:</strong> {sales.carro}</p>
          <p><strong>Data:</strong> {sales.data}</p>
          <p><strong>Código de venda:</strong> {sales.codigo}</p>
          {/* Você pode adicionar mais informações do cliente aqui, conforme necessário */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalInfoVendas;