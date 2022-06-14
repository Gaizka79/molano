import React, { useState, useEffect } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Product from "./Product/Product";
import { Link } from "react-router-dom";
import Add from './Add/Add';

function Products () {
  const [ productos, setProductos ] = useState([]);

  useEffect(() => {
    async function getProducts () {
      const results = await axios.get(`http://localhost:5000/api/Products`)
      const data = await results.data;
      setProductos(data);
    }
    getProducts();
  },[]);

  const handleAdd = () =>  {
    console.log("kaixo");
    <Link to="/Add"></Link>   
     //<Link href="/Products/Add"/>
    //return <Add/>
  }

  const paintProducts = () => {
    return productos.map(
      (temp) => (
      <Product value={temp} key={uuidv4()}/>))
  };

  return (
    <>
      <h1 className="encabezado_productos">Productos</h1>
      <div className="buttons">
        <button className="postBt" href='/Add' ><b>Añadir productos</b></button>
        <button className="putBt"><b>Editar</b></button>
        <button className="deleteBt"><b>Borrar</b></button>
      </div>
      <div className="padreProducts">
        {paintProducts()}
        {/* {productos === [] ? ""
        : productos.map((temp) => <Product value={temp} key={uuidv4()}/>)} */}
      </div>
    </>
  )
}

export default Products;
