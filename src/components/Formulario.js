import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";
import Error from './Error'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #56bafb;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({setmoneda,setcriptomoneda}) => {
  //state de listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, seterror] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
  ];

  //utilizar el hook

  const [moneda, SelectMonedas] = useMoneda("Elige tu moneda", "", MONEDAS);

  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elije tu criptomoneda",
    "",
    listacripto
  );

  //Ejecutar llamados a la API para rellenar el select de las criptomonedas

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  //cuando el usuario hace submit

  const cotizarMoneda = (e) => {
    e.preventDefault();

    // validar si ambos campos esta llenos

    if (moneda === '' || criptomoneda=== '') {
        seterror(true);
        return;
    }

    //pasar los datos al componente principal
    setmoneda(moneda);
    setcriptomoneda(criptomoneda);

    seterror(false);

  };

  return (
    <form onSubmit={cotizarMoneda}>

        {error? <Error mensaje="Todos los campos son obligatorios"/> : null}

      <SelectMonedas />

      <SelectCripto />

      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
