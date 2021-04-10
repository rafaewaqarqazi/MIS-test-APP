export function setupAxios(axios) {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }

      return config;
    },
    (err) => Promise.reject(err)
  );
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log({ error });
      if (error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/signIn";
        return Promise.reject(error);
      }
      return Promise.reject(error);
    }
  );
}
