// src/components/admin/Products/ProductImages.js

import React, { useEffect, useState } from "react";
import {
  uploadProductImage,
  getProductImages,
  deleteProductImage,
  setPrimaryImage,
} from "../../../api/productImageService";
import { toast } from "sonner";

export default function ProductImages({ productId, onNavigate }) {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    loadImages();
    // eslint-disable-next-line
  }, [productId]);

  const loadImages = async () => {
    try {
      setLoading(true);
      const data = await getProductImages(productId);
      setImages(data || []);
    } catch (err) {
      toast.error("Failed to load images");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.warning("Please select an image!");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("product_id", productId);

    try {
      await uploadProductImage(formData);
      toast.success("Image uploaded successfully!");
      setFile(null);
      loadImages();
    } catch (err) {
      toast.error("Upload failed!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductImage(id);
      toast.success("Image deleted!");
      loadImages();
    } catch (err) {
      toast.error("Failed to delete image!");
    }
  };

  const handleSetPrimary = async (id) => {
    try {
      await setPrimaryImage(productId, id);
      toast.success("Primary image updated!");
      loadImages();
    } catch (err) {
      toast.error("Failed to update primary image!");
    }
  };

  return (
    <div className="container my-4">
      <h3 className="fw-bold">Manage Product Images</h3>

      <div className="card shadow-sm p-3 my-3">
        <h6>Upload New Image</h6>
        <input
          type="file"
          accept="image/*"
          className="form-control mt-2"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn btn-success mt-3" onClick={handleUpload}>
          Upload Image
        </button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border text-success"></div>
        </div>
      ) : (
        <div className="row g-3 mt-3">
          {images.length > 0 ? (
            images.map((img) => (
              <div
                key={img.id}
                className="col-lg-3 col-md-4 col-sm-6 text-center"
              >
                <div className="border rounded p-2 shadow-sm">
                  <img
                    src={
                      img.url?.startsWith("http")
                        ? img.url
                        : `${baseURL}${img.url}`
                    }
                    alt={img.alt_text || "Product"}
                    className="img-fluid rounded"
                    style={{ height: "160px", objectFit: "cover" }}
                  />

                  {img.is_primary === 1 && (
                    <span className="badge bg-success mt-2">Primary</span>
                  )}

                  <div className="mt-2 d-flex justify-content-center gap-2">
                    {img.is_primary !== 1 && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleSetPrimary(img.id)}
                      >
                        Set Primary
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(img.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted text-center">No images found</p>
          )}
        </div>
      )}

      <button
        className="btn btn-secondary mt-4"
        onClick={() => onNavigate("admin-products")}
      >
        Back to Products
      </button>
    </div>
  );
}
