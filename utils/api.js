import { apiUrl, apiToken } from "./urls";

export const fetchDataFromApi = async (endpoint) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + apiToken,
    },
  };
  const response = await fetch(`${apiUrl}${endpoint}`, options);
  const data = await response.json();
  return data;
};

export const makePaymentRequest = async (endpoint, payload) => {
  const res = await fetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + apiToken,
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
