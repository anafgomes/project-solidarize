import { UserInfoClerk } from "@/@types/userClerkTypes";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

const apiAxios = axios.create({
  baseURL: "http://192.168.0.111:3001/",
});

// apiAxios.interceptors.request.use((config) => {
//   const { user = {} as UserInfoClerk } = useUser();
//   const token = user?.unsafeMetadata?.token;

//   if (token) {
//     // Adiciona o token no cabeçalho Authorization como Bearer token
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });

apiAxios.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: any) => {
    if (error.response) {
      const status = error.response.status;
      if (status >= 200 && status < 600) {
        console.log("error.response", error.response);
        return Promise.resolve(error.response);
      }
    }
    return Promise.reject(error);
  },
);

export default apiAxios;
