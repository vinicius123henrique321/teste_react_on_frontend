import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  useToast
} from '@chakra-ui/react';
import * as api from '../services/Api';
import { CopyIcon } from '@chakra-ui/icons';

const VehicleView = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingMarca, setEditingMarca] = useState('');
  const [editingModelo, setEditingModelo] = useState('');
  const [editingAno, setEditingAno] = useState('');
  const [editingCor, setEditingCor] = useState('');
  const [copiedData, setCopiedData] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchVeiculos();
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await api.getVeiculos();
      setVeiculos(response.data);
    } catch (error) {
      console.error('Error fetching veiculos:', error);
    }
  };

  const handleCopyVeiculos = (veiculo) => {
    const copiedText = `Marca: ${veiculo.marca}\nModelo: ${veiculo.modelo}\nAno: ${veiculo.ano}\nCor: ${veiculo.cor}`;
    navigator.clipboard.writeText(copiedText); // Copia o texto para a área de transferência
    setCopiedData(copiedText);
    toast({
        title: "Dados copiados com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
    });
};

  return (
    <Box display="flex" flexDir="column" ml="16rem" height="100vh" p={4} position="relative">
      <Heading size="lg" mb={4}>Veículos disponíveis:</Heading>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th w="25%">Marca</Th>
            <Th w="25%">Modelo</Th>
            <Th w="25%">Ano</Th>
            <Th w="25%">Cor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {veiculos.map(veiculo => (
            <Tr key={veiculo.id}>
              <Td>{editingId === veiculo.id ? <Input value={editingMarca} onChange={(e) => setEditingMarca(e.target.value)} /> : veiculo.marca}</Td>
              <Td>{editingId === veiculo.id ? <Input value={editingModelo} onChange={(e) => setEditingModelo(e.target.value)} /> : veiculo.modelo}</Td>
              <Td>{editingId === veiculo.id ? <Input value={editingAno} onChange={(e) => setEditingAno(e.target.value)} /> : veiculo.ano}</Td>
              <Td>{editingId === veiculo.id ? <Input value={editingCor} onChange={(e) => setEditingCor(e.target.value)} /> : veiculo.cor}</Td>
              <Td><Button colorScheme='blue' size="sm" onClick={() => handleCopyVeiculos(veiculo)}><CopyIcon /></Button></Td>    
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default VehicleView;
