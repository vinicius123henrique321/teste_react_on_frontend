import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Flex,
    Button,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Text
} from '@chakra-ui/react';

import { CopyIcon, DeleteIcon } from '@chakra-ui/icons';
import * as api from "../services/Api"

const SimulationView = () => {
    const [simulations, setSimulations] = useState([]);
    const [copiedData, setCopiedData] = useState(null); // Estado para armazenar os dados copiados
    const toast = useToast();
    
    useEffect(() => {
        fetchSimulations();
    }, []);
    
    const fetchSimulations = async () => {
        try {
            const response = await api.getAll();
            setSimulations(response.data);
        } catch (error) {
            console.error("Error fetching simulations:", error);
        }
    };
    
    const handleCopySimulation = (simulation) => {
        const copiedText = `Cpf: ${simulation.cliente_cpf}\nNome: ${simulation.cliente_nome}\nCredito: ${simulation.creditScore}\nAprovação: ${simulation.approvalStatus}\nLimite: ${simulation.creditLimit}`;
        navigator.clipboard.writeText(copiedText); // Copia o texto para a área de transferência
        setCopiedData(copiedText);
        toast({
            title: "Dados copiados com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    const handleDelete = async (id_sim) => {
        try {
          await api.deleteSimulation(id_sim);
          setSimulations(simulations.filter(simulation => simulation.id_sim !== id_sim));
          toast({
            title: 'Sucesso',
            description: 'Simulação excluída com sucesso.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error('Error deleting simulation:', error);
          toast({
            title: 'Erro',
            description: 'Erro ao excluir simulação.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
    };
    
    return (
        <Box display="flex" flexDir="column" ml="16rem" height="100vh" p={4}>
        <Heading size="lg" mb={4}>Histórico de simulações:</Heading>
            <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Cpf</Th>
                        <Th>Nome</Th>
                        <Th>Credito</Th>
                        <Th>Aprovação</Th>
                        <Th>Limite</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {simulations.map(simulation => (
                        <Tr key={simulation.id_sim}>
                            <Td>{simulation.cliente_cpf}</Td>
                            <Td>{simulation.cliente_nome}</Td>
                            <Td>{simulation.creditScore}</Td>
                            <Td>{simulation.approvalStatus}</Td>
                            <Td>{simulation.creditLimit}</Td>
                            <Td display="flex" gap={5}>
                                <Button colorScheme="red" size="sm" onClick={() => handleDelete(simulation.id_sim)}><DeleteIcon/></Button>
                                <Button colorScheme='blue' size="sm" onClick={() => handleCopySimulation(simulation)}><CopyIcon /></Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
    };
    
    export default SimulationView;