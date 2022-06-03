import React from "react";
import axios from "axios";

function Add () {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, family, description, price, foto } = event.target;
    const body = {};
    body.name = name.value;
    body.family = family.value;
    body.description = description.value;
    body.price = price.value;
    body.foto = foto.value;

    await axios.post(`http://localhost:5000/Products/create/`, body)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    event.target = "";
  }

  return (
    <>
      <h2>Añadir Producto</h2>
      <form className="add_product" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" />

        <label htmlFor="family">Familia</label>
        <input type="text" name="family" />
        
        <label htmlFor="description">Descripción</label>
        <input type="text" name="description" />

        <label htmlFor="price">Precio</label>
        <input type="text" name="price" />

        <label htmlFor="foto">Foto</label>
        <input type="text" name="foto" />

        <button className="submitBt" type="submit" >Añadir</button>
      </form>
    </>
  )
  
}

export default Add;
