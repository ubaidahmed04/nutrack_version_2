// import axios from "axios";
// const URL = "webapi2.nubitsoft.com/";
// // const URL = "localhost:8000/";

// const getFullUrl = (route, useHttps = true) => {
//   const protocol = useHttps ? "https://" : "http://";
//   return `${protocol}${URL}${route}`;
// };
// export const getRequest = async (route,useHttps = true) => {
//     const config = {
//     url: getFullUrl(route, useHttps),
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     }
//   };
//   try {
//     const res = await axios.request(config);
//     return res.data
//   } catch(err) {
//     if (useHttps) {
//       return getRequest(route, false);
//     }
//     return err.response ? err.response.data : { error: "Request failed" };
//   }
// };
// export const postRequest = async (route,data, useHttps = true) => {
//     const config = {
//       url: getFullUrl(route, useHttps),
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: JSON.stringify(data),
//   };
//   try {
//     const res = await axios.request(config);
//     return res.data
//   } catch(err) {
//     if (useHttps) {
//       return postRequest(route, data, false);
//     }
//     return err.response ? err.response.data : { error: "Request failed" };
//   }



   

import axios from "axios";
const URL = "https://webapi3.nubitsoft.com/";
// const URL = "http://localhost:8000/";

export const getRequest = async (route) => {
    const config = {
    url: URL + route,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  };
  try {
    const res = await axios.request(config);
    return res.data
  } catch(err) {
    return err.response.data;
  }
};
export const postRequest = async (route,data) => {
    const config = {
      url: URL + route,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
  };
  try {
    const res = await axios.request(config);
    return res.data
  } catch(err) {
    return err.response.data
  }
};
export const updateRequest = async (route,data) => {
  const config = {
    url: URL + route,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
};
try {
  const res = await axios.request(config);
  return res.data
} catch(err) {
  return err.response.data
}
};