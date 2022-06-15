import React from "react";
import axios from "axios";
import firebaseConfig from "../../../../utils/firebaseConfig";

import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";

function Add () {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { name, family, description, price, foto } = event.target;
    const body = {};
    body.name = name.value;
    body.family = family.value;
    body.description = description.value;
    body.price = price.value;
    body.foto = await uploadFoto(foto.files[0]);

    await axios.post(`http://localhost:5000/api/Products/create/`, body)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  initializeApp(firebaseConfig);
  const uploadFoto = async (foto) => {
    const storage = getStorage();
    const storageRef = ref(storage); //Apunta al nivel superior del bucket(raíz)  
    //const refStorage = ref(storageService, `images/${foto.name}`);
    const refStorage = ref(storageRef, `images/${foto.name}`);
    const uploadTask = await uploadBytesResumable(refStorage, foto);
    const urlFoto = await getDownloadURL(uploadTask.ref).then((downloadURL) => {
      return downloadURL
    });
    return urlFoto;
  }

  return (
    <div className="add">
      <h2>Añadir Producto</h2>
      <form className="add_product" onSubmit={handleSubmit} accept="image/*" encType="multipart/form-data">
        <label htmlFor="name">Nombre</label>
        <input type="text" name="name" />

        <label htmlFor="family">Familia</label>
        <input type="text" name="family" label="familiaiaia" />
        
        <label htmlFor="description">Descripción</label>
        <input type="text" name="description" />

        <label htmlFor="price">Precio</label>
        <input type="text" name="price" />

        <label htmlFor="foto">Foto</label>
        <input type="file" name="foto" />

        <input className="submitBt" type="submit"/>
      </form>
    </div>
  )
}

export default Add;