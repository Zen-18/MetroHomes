import axios from "axios";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const baseUrl = "http://localhost:3000/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};

export const getAllProperties = async () => {
  try {
    const response = await api.get("/residency/allresd", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getUserData = async (user) => {
  const { email } = user;
  const body = JSON.stringify({ email });
  try {
    const response = await fetch(`${baseUrl}/user/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return await response.json();
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};
export const getEmailVerification = async (user) => {
  const { email } = user;
  const body = JSON.stringify({ email });
  // try {
  //   const response = await api.post("/user/send-verify-email", {
  //     timeout: 10 * 1000,
  //   });
  const response = await fetch(`${baseUrl}/user/send-verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  //   if (response.status === 400 || response.status === 500) {
  //     throw response.data;
  //   }
  //   return response.data;
  // } catch (error) {
  //   throw error;
  // }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email, token) => {
  try {
    await api.post(
      `/user/register`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createResidency = async (data, token) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.email) {
    throw new Error("User email not found in localStorage");
  }

  const email = user.email;
  try {
    const res = await api.post(
      `/residency/create`,
      {
        data,
        owner: { connect: { email } },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await api.delete(`/residency/${id}`);

    if (response.status === 200) {
      toast.success("Property deleted successfully");
    } else {
      throw new Error("Failed to delete property");
    }
  } catch (error) {
    toast.error("Error deleting property");
    throw error;
  }
};

export const updateResidency = async (id, data, token) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.email) {
      throw new Error("User email not found in localStorage");
    }

    const email = user.email;

    const response = await api.patch(
      `/residency/${id}`,
      {
        data,
        owner: { connect: { email } },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      toast.success("Residency updated successfully");
    } else {
      throw new Error("Failed to update residency");
    }
  } catch (error) {
    toast.error("Error updating residency");
    throw error;
  }
};

//Lawyer
export const createLawyer = async (data, token) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.email) {
    throw new Error("User email not found in localStorage");
  }

  const email = user.email;
  try {
    const res = await api.post(
      `/lawyer/register`,
      {
        data,
        owner: { connect: { email } },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw error;
  }
};

export const getAllLawyers = async () => {
  try {
    const response = await api.get("/lawyer/allLawyer", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getLawyer = async (id) => {
  try {
    const response = await api.get(`/lawyer/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

//Lawyer
export const getAllLoans = async () => {
  try {
    const response = await api.get("/loan/allLoans", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

