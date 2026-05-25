const API_BASE_URL =
  "http://localhost:3001/api/auth";

const handleResponse = async (
  response
) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Something went wrong"
    );
  }

  return data;
};

export const registerUser =
  async (payload) => {
    const response = await fetch(
      `${API_BASE_URL}/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(payload),
      }
    );

    return handleResponse(response);
  };

export const loginUser =
  async (payload) => {
    const response = await fetch(
      `${API_BASE_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(payload),
      }
    );

    return handleResponse(response);
  };