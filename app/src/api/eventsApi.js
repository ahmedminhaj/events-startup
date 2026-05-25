const API_BASE_URL =
  "http://localhost:3001/api/events";

const handleResponse = async (response) => {
  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const errorData = await response.json();

      message =
        errorData.message || message;
    } catch {
      // ignore json parse error
    }

    throw new Error(message);
  }

  return response.json();
};

export const getEvents = async () => {
  try {
    const response = await fetch(
      API_BASE_URL
    );

    return await handleResponse(response);
  } catch (error) {
    console.error(
      "Failed to fetch events:",
      error
    );

    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${id}`
    );

    return await handleResponse(response);
  } catch (error) {
    console.error(
      "Failed to fetch event:",
      error
    );

    throw error;
  }
};