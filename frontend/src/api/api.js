import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5003/api" });

// Attach token to request headers
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

/** Auth APIs */
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);

/** Stay APIs */
export const fetchStays = async () => {
  try {
    const response = await API.get("/stays");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching stays:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** Food APIs */
export const fetchFoods = async () => {
  try {
    const response = await API.get("/foods");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching foods:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** Contact APIs */
export const fetchContacts = async () => {
  try {
    const response = await API.get("/contacts");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching contacts:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** Place APIs */
export const fetchPlaces = async () => {
  try {
    const response = await API.get("/places");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching places:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** Explore APIs */
export const fetchExplore = async () => {
  try {
    const response = await API.get("/explore");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching explore data:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** Notification APIs */
export const fetchNotifications = async () => {
  try {
    const response = await API.get("/notifications");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching notifications:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await API.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error(
      "Error marking notification as read:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** Booking APIs */
export const createBooking = async (data) => {
  try {
    const response = await API.post("/bookings", data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating booking:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const fetchBookings = async () => {
  try {
    const response = await API.get("/bookings");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching bookings:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await API.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error canceling booking:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** ✅ Cart APIs */
export const fetchCart = async () => {
  try {
    const response = await API.get("/cart");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addToCart = async (item) => {
  try {
    const response = await API.post("/cart", item);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding to cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const removeFromCart = async (id) => {
  try {
    const response = await API.delete(`/cart/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error removing item from cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

/** ✅ Payment APIs */
export const processPayment = async (paymentData) => {
  try {
    const response = await API.post("/payment", paymentData);
    return response.data;
  } catch (error) {
    console.error(
      "Error processing payment:",
      error.response?.data || error.message
    );
    throw error;
  }
};
