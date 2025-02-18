import apiAxios from "@/components/axiosApi";

export const makeRequest = async (endpoint: string, data?: any) => {
  try {
    const response = await apiAxios.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${error}`);
  }
};
