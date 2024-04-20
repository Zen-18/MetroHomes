import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
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

//property
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

export const bookVisit = async(date, propertyId, email, token) => {
  try{
await api.post(
  `/user/bookVisit/${propertyId}`,
  {
    email,
  id: propertyId,
  date: dayjs(date).format("DD/MM/YYYY")
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }
)
  }catch (error) {
toast.error("Somthing went wrong, Please try again")
  }

}

export const removeBooking = async(id, email, token) => {
  try{
    await api.post(
      `/user/removeBookings/${propertyId}`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    )
      }catch (error) {
    toast.error("Somthing went wrong, Please try again")
      }
    
}

export const toFav = async (id, email, token) => {
  try{
    await api.post(
      `/user/toFav/${id}`,
      {
        email,
      },
      {
      headers: {
        Authorization: `Bearer ${token}`,
      }
      }
    )
      } catch (e) {
        throw e;
      }
    }

    export const getAllFav = async(email, token) => {
      if(!token) return
      try{
        const res = await api.post(
          `/user/allFav`,
          {
            email,
          },
          {
          headers: {
            Authorization: `Bearer ${token}`,
          }
          }
        )
        
        return res.data["favResidenciesID"]
          } catch (e) {
            throw e;
          }
        }

        export const getAllBookings = async(email, token) => {
          if(!token) return
          try{
            const res = await api.post(
              `/user/allBookings`,
              {
                email,
              },
              {
              headers: {
                Authorization: `Bearer ${token}`,
              }
              }
            )
            
            return res.data["bookedVisits"]
              } catch (e) {
                toast.error("Something went wrong while fetching bookings")
                throw e;
              }
            }

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

export const deleteLawyer = async (id) => {
  try {
    const response = await api.delete(`/lawyer/${id}`);

    if (response.status === 200) {
      toast.success("Lawyer deleted successfully");
    } else {
      throw new Error("Failed to delete lawyer");
    }
  } catch (error) {
    toast.error("Error deleting lawyer");
    throw error;
  }
};

//Loan
export const createLoan = async (data, token) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.email) {
    throw new Error("User email not found in localStorage");
  }

  const email = user.email;
  try {
    const res = await api.post(
      `/loan/create`,
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

export const deleteLoan = async (id) => {
  try {
    const response = await api.delete(`/loan/${id}`);

    if (response.status === 200) {
      toast.success("Loan deleted successfully");
    } else {
      throw new Error("Failed to delete Loan");
    }
  } catch (error) {
    toast.error("Error deleting Loan");
    throw error;
  }
};

//Token
export const getTokenPassword = () => {
  const [loading, setLoading] = useState(false);
  const getPasswordToken = async (email) => {
    setLoading(true);
    const body = JSON.stringify({ email: email });

    const response = await fetch(`${baseUrl}/user/get-password-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      setLoading(false);
      toast.error(response.statusText);
      return;
    }
    const data = await response.json();
    setLoading(false);
    toast.success("Email Sent");
    return data;
  };
  return { getPasswordToken, loading };
};

export const resetPassword = () => {
  const [loading, setLoading] = useState(false);
  const userResetPassword = async (password, emailToken) => {
    console.log({ password, token: emailToken });
    setLoading(true);
    const body = JSON.stringify({ password, token: emailToken });

    const response = await fetch(`${baseUrl}/user/reset-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    if (!response.ok) {
      setLoading(false);
      toast.error(response.statusText);
      return;
    }
    const data = await response.json();
    setLoading(false);
    toast.success(data.message);
    return data;
  };
  return { userResetPassword, loading };
};

