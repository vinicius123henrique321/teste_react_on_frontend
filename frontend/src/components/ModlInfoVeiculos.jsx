import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

const ModalInfoVeiculos = ({ isOpen, onClose, car }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Informações do Carro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p><strong>Nome:</strong> {car.nameCar}</p>
          <p><strong>Modelo:</strong> {car.modelo}</p>
          <p><strong>Marca:</strong> {car.marca}</p>
          <p><strong>Ano:</strong> {car.ano}</p>
          <p><strong>Cor:</strong> {car.cor}</p>
          <p><strong>Condição:</strong> {car.condCar}</p>
          <p><strong>Placa:</strong> {car.placa}</p>
          {/* Você pode adicionar mais informações do cliente aqui, conforme necessário */}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>Fechar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalInfoVeiculos;