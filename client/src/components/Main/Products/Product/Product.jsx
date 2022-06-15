import React from "react";
import noImage from '../../../../../src/assets/no_image.png';

function Product (props) {

  const { description, family, foto, name, price, _id } = props.value;
  
  return (
    <article className="producto">
      <p className="_id">{_id}</p>
      <h2>{name}</h2>
      <h4>Familia: {family}</h4>
      <p><b>Descripción:</b> {description}</p>
      <p><b>Precio: </b> {price} €/kg.</p>
      {foto ? <img src={foto} alt="argazkia" /> :
        <img src={noImage} alt="argazkia" />}
      <div className="product_buttons">
        <button className="putBt"><b>Editar</b></button>
        <button className="deleteBt"><b>Borrar</b></button>
      </div>
    </article>
  )
}

export default Product;
