import React, { useEffect, useState } from "react";
import { uploadProductImage, getProductImages, deleteProductImage } from "../../../api/productImageService";

export default function ProductImages({ productId, onNavigate }) {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  const loadImages = async () => {
    const data = await getProductImages(productId);
    setImages(data);
  };

  useEffect(() => { loadImages(); }, []);

  const uploadImage = async () => {
    if (!file) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_id", productId);

    await uploadProductImage(formData);
    setFile(null);
    loadImages();
  };

  const handleDelete = async (id) => {
    await deleteProductImage(id);
    loadImages();
  };

  return (
    <div className="container my-4">
      <h3>Manage Product Images</h3>

      <div className="mb-3">
        <input type="file"
          className="form-control"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-success mt-2" onClick={uploadImage}>
          Upload
        </button>
      </div>

      <div className="row g-3">
        {images.map((img) => (
          <div className="col-md-3 text-center" key={img.id}>
            <img src={`/${img.url}`} alt="" className="img-fluid rounded shadow" />
            <button
              className="btn btn-sm btn-danger mt-2"
              onClick={() => handleDelete(img.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button className="btn btn-secondary mt-4"
        onClick={() => onNavigate("admin-products")}>Back</button>
    </div>
  );
}
