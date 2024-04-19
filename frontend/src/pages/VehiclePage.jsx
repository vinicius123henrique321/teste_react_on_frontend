import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { saveAs } from "file-saver";
import * as api from "../services/Api";

const VehiclePage = () => {
  const history = useHistory();
  const [veiculos, setVeiculos] = useState([]);
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [cor, setCor] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingMarca, setEditingMarca] = useState("");
  const [editingModelo, setEditingModelo] = useState("");
  const [editingAno, setEditingAno] = useState("");
  const [editingCor, setEditingCor] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchVeiculos();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    };
  
    document.addEventListener("keydown", handleKeyPress);
  
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const fetchVeiculos = async () => {
    try {
      const response = await api.getVeiculos();
      setVeiculos(response.data);
    } catch (error) {
      console.error("Error fetching veiculos:", error);
    }
  };

  const handleDownload = () => {
    // Construa o conteúdo do arquivo TXT com base nos dados da tabela
    let tableContent = 'Marca\tModelo\tAno\tCor\n'; // Cabeçalho da tabela
    veiculos.forEach(veiculo => {
      tableContent += `${veiculo.marca}\t${veiculo.modelo}\t${veiculo.ano}\t${veiculo.cor}\n`;
    });

    // Crie um Blob com o conteúdo do arquivo TXT
    const blob = new Blob([tableContent], { type: 'text/plain;charset=utf-8' });

    // Use a função saveAs do file-saver para iniciar o download do arquivo
    saveAs(blob, 'veiculos.txt');
  };

  const handleSubmit = async () => {
    try {
      if (!marca || !modelo || !ano || !cor) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      if (editingId) {
        await handleUpdateVeiculo();
      } else {
        await handleAddVeiculo();
      }
    } catch (error) {
      console.error("Error handling submit:", error);
      toast({
        title: "Erro ao enviar dados",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddVeiculo = async () => {
    const response = await api.addVeiculo({ marca, modelo, ano, cor });
    setVeiculos([...veiculos, response.data]);
    toast({
      title: "Veículo adicionado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    resetForm();
  };

  const handleDeleteVeiculo = async (id) => {
    try {
      await api.deleteVeiculo(id);
      setVeiculos(veiculos.filter((veiculo) => veiculo.id !== id));
      toast({
        title: "Veículo excluído com sucesso!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting veiculo:", error);
      toast({
        title: "Erro ao excluir veículo",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditClick = (veiculo) => {
    setEditingId(veiculo.id);
    setEditingMarca(veiculo.marca);
    setEditingModelo(veiculo.modelo);
    setEditingAno(veiculo.ano);
    setEditingCor(veiculo.cor);
  };

  const handleUpdateVeiculo = async () => {
    await api.updateVeiculo(editingId, {
      marca: editingMarca,
      modelo: editingModelo,
      ano: editingAno,
      cor: editingCor,
    });
    const updatedVeiculos = veiculos.map((veiculo) => {
      if (veiculo.id === editingId) {
        return {
          ...veiculo,
          marca: editingMarca,
          modelo: editingModelo,
          ano: editingAno,
          cor: editingCor,
        };
      }
      return veiculo;
    });
    setVeiculos(updatedVeiculos);
    setEditingId(null);
    resetForm();
    toast({
      title: "Veículo atualizado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const resetForm = () => {
    setMarca("");
    setModelo("");
    setAno("");
    setCor("");
  };

  return (
    <Box display="flex" flexDir="column" ml="16rem" height="100vh" p={4}>
      <Heading size="lg" mb={4}>Veículos disponíveis:</Heading>
      <Button 
        onClick={handleDownload} 
        position="absolute" 
        top="1rem" 
        right="1rem" 
        size="sm"
        colorScheme='blue'
      >
        Baixar Cópia de Veículos
      </Button>
      <Flex mb={4}>
        <Input
          width="20vw"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          mr={2}
        />
        <Input
          width="20vw"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          mr={2}
        />
        <Input
          width="20vw"
          placeholder="Ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          mr={2}
        />
        <Input
          width="20vw"
          placeholder="Cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          mr={2}
        />
        {editingId ? (
          <Button onClick={handleSubmit} mr={2}>
            Salvar
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            p="2-px"
            onClick={handleSubmit}
            leftIcon={<AddIcon />}
            isDisabled={!marca || !modelo || !ano || !cor}
          >
            Adicionar
          </Button>
        )}
      </Flex>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th w="30%">Marca</Th>
            <Th w="30%">Modelo</Th>
            <Th w="20%">Ano</Th>
            <Th w="20%">Cor</Th>
            <Th w="10%"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {veiculos.map((veiculo) => (
            <Tr key={veiculo.id}>
              <Td>
                {editingId === veiculo.id ? (
                  <Input
                    value={editingMarca}
                    onChange={(e) => setEditingMarca(e.target.value)}
                  />
                ) : (
                  veiculo.marca
                )}
              </Td>
              <Td>
                {editingId === veiculo.id ? (
                  <Input
                    value={editingModelo}
                    onChange={(e) => setEditingModelo(e.target.value)}
                  />
                ) : (
                  veiculo.modelo
                )}
              </Td>
              <Td>
                {editingId === veiculo.id ? (
                  <Input
                    value={editingAno}
                    onChange={(e) => setEditingAno(e.target.value)}
                  />
                ) : (
                  veiculo.ano
                )}
              </Td>
              <Td>
                {editingId === veiculo.id ? (
                  <Input
                    value={editingCor}
                    onChange={(e) => setEditingCor(e.target.value)}
                  />
                ) : (
                  veiculo.cor
                )}
              </Td>
              <Td>
                {editingId === veiculo.id ? (
                  <>
                    <IconButton
                      colorScheme="blue"
                      aria-label="Salvar"
                      icon={<AddIcon />}
                      onClick={handleUpdateVeiculo}
                      m={1}
                    />
                  </>
                ) : (
                  <IconButton
                    colorScheme="blue"
                    aria-label="Editar"
                    icon={<EditIcon />}
                    onClick={() => handleEditClick(veiculo)}
                    m={1}
                  />
                )}
                <IconButton
                  colorScheme="red"
                  aria-label="Excluir"
                  icon={<DeleteIcon />}
                  onClick={() => handleDeleteVeiculo(veiculo.id)}
                  m={1}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VehiclePage;
