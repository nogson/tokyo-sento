const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const ENDPOINT = {
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  GET_USER: `${BASE_URL}/user`,
  GET_GIOJSON: "/assets/json/map.geojson",
};

export default ENDPOINT;
