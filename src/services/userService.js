import instance from "../API/axios";

export const fetchUsers = async (token) => {
  return instance.get("/User", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchRoles = async (token) => {
  return instance.get("/Role", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addUser = async (token, payload) => {
  return instance.post("/User", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const updateUser = async (token, userId, payload) => {
  return instance.put(`/User/${userId}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const deleteUser = async (token, userId) => {
  return instance.delete(`/User/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
