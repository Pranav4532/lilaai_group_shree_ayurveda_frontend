import React, { useEffect, useState } from "react";
import {
  getCurrentUser,
  getUserById,
  updateUserProfile,
} from "../api/userService";
import {
  getUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../api/addressService";
import {
  User,
  Phone,
  Mail,
  Edit3,
  Save,
  MapPin,
  PlusCircle,
  Trash,
} from "lucide-react";

import { toast } from "sonner";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [addresses, setAddresses] = useState([]);

  const [newAddress, setNewAddress] = useState({
    label: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
    is_default: false,
  });

  const [editAddressData, setEditAddressData] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user + addresses
  useEffect(() => {
    const current = getCurrentUser();
    if (!current) return (window.location.href = "/");

    setUser(current);
    loadUser(current.id);
    loadAddresses();
  }, []);

  // Load full user info
  const loadUser = async (id) => {
    try {
      const data = await getUserById(id);
      setFormData(data);
    } catch (err) {
      console.error("Failed to load user:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load addresses
  const loadAddresses = async () => {
    try {
      const data = await getUserAddresses();
      setAddresses(data || []);
    } catch (err) {
      console.error("Failed to load addresses:", err);
    }
  };

  const handleProfileChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleProfileSave = async () => {
    try {
      const { full_name, phone } = formData; // ⬅ pick allowed fields only

      const res = await updateUserProfile(user.id, {
        full_name,
        phone,
      });

      // 🔄 Update localStorage so UI updates
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
        setUser(res.user);
        setFormData(res.user);
      }

      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
  };

  const handleNewAddressChange = (field, value) =>
    setNewAddress((prev) => ({ ...prev, [field]: value }));

  const handleAddAddress = async () => {
    try {
      await createAddress(newAddress);
      toast.success("Address added successfully! 🎉");
      setIsAddingAddress(false);
      loadAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add address ❌");
    }
  };

  const handleUpdateAddress = async (id, data) => {
    try {
      await updateAddress(id, data);
      toast.success("Address updated successfully! 🎉");
      setIsEditingAddress(false);
      loadAddresses();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update address ❌");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    toast.warning("Click delete to confirm.", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            await deleteAddress(id);
            toast.success("🗑️ Address deleted!");
            loadAddresses();
          } catch (err) {
            toast.error("❌ Failed to delete address.");
          }
        },
      },
    });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-success"></div>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          {/* PROFILE CARD */}
          <div className="card shadow border-0 rounded-4 mb-4">
            <div className="card-header bg-success text-white text-center py-3">
              <User size={28} className="mb-2" />
              <h4 className="fw-semibold mb-0">My Profile</h4>
            </div>

            <div className="card-body p-4">
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  className="form-control"
                  value={formData.full_name || ""}
                  readOnly={!isEditingProfile}
                  onChange={(e) =>
                    handleProfileChange("full_name", e.target.value)
                  }
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Mail size={16} />
                  </span>
                  <input
                    className="form-control"
                    value={formData.email || ""}
                    readOnly
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Phone</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <Phone size={16} />
                  </span>
                  <input
                    className="form-control"
                    value={formData.phone || ""}
                    readOnly={!isEditingProfile}
                    onChange={(e) =>
                      handleProfileChange("phone", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4">
                {isEditingProfile ? (
                  <>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setIsEditingProfile(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={handleProfileSave}
                    >
                      <Save size={16} className="me-1" /> Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    className="btn btn-success w-100"
                    onClick={() => setIsEditingProfile(true)}
                  >
                    <Edit3 size={16} className="me-1" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ADDRESS LIST */}
          <div className="card shadow border-0 rounded-4">
            <div className="card-header bg-light d-flex justify-content-between align-items-center">
              <h5 className="fw-semibold m-0 d-flex align-items-center gap-2 text-success">
                <MapPin size={18} /> My Addresses
              </h5>
              <button
                className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                onClick={() => setIsAddingAddress(true)}
              >
                <PlusCircle size={15} /> Add New
              </button>
            </div>

            <div className="card-body">
              {addresses.length === 0 ? (
                <p className="text-muted">No addresses added yet.</p>
              ) : (
                addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="border rounded-3 p-3 mb-3 bg-light"
                  >
                    <strong>{addr.label || "Address"}</strong>
                    <div className="small text-muted">
                      {addr.address_line1}, {addr.address_line2}, {addr.city},{" "}
                      {addr.state} - {addr.postal_code}
                      <br />
                      📞 {addr.phone}
                    </div>

                    <div className="d-flex gap-2 mt-2">
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                          setEditAddressData(addr);
                          setIsEditingAddress(true);
                        }}
                      >
                        <Edit3 size={14} /> Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteAddress(addr.id)}
                      >
                        <Trash size={14} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ADD NEW ADDRESS MODAL */}
          {isAddingAddress && (
            <AddressModal
              title="Add New Address"
              address={newAddress}
              setAddress={setNewAddress}
              onClose={() => setIsAddingAddress(false)}
              onSave={handleAddAddress}
            />
          )}

          {/* EDIT ADDRESS MODAL */}
          {isEditingAddress && editAddressData && (
            <AddressModal
              title="Edit Address"
              address={editAddressData}
              setAddress={setEditAddressData}
              onClose={() => setIsEditingAddress(false)}
              onSave={() =>
                handleUpdateAddress(editAddressData.id, editAddressData)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ✨ REUSABLE ADDRESS MODAL COMPONENT */
function AddressModal({ title, address, setAddress, onClose, onSave }) {
  const updateField = (field, value) =>
    setAddress((prev) => ({ ...prev, [field]: value }));

  return (
    <div
      className="modal fade show d-block"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 rounded-4">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">{title}</h5>
            <button
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <input
              className="form-control mb-2"
              placeholder="Label"
              value={address.label}
              onChange={(e) => updateField("label", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Address Line 1"
              value={address.address_line1}
              onChange={(e) => updateField("address_line1", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Address Line 2"
              value={address.address_line2}
              onChange={(e) => updateField("address_line2", e.target.value)}
            />

            <div className="row">
              <div className="col">
                <input
                  className="form-control mb-2"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => updateField("city", e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  className="form-control mb-2"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => updateField("state", e.target.value)}
                />
              </div>
            </div>

            <input
              className="form-control mb-2"
              placeholder="Postal Code"
              value={address.postal_code}
              onChange={(e) => updateField("postal_code", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Country"
              value={address.country}
              onChange={(e) => updateField("country", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Phone"
              value={address.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={onSave}>
              <Save size={15} className="me-1" /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
