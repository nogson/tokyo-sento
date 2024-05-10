import { R } from "node_modules/@tanstack/react-query-devtools/build/modern/devtools-9h89nHJX";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const ENDPOINT = {
  GET_GIOJSON: "/assets/json/map.geojson",
  LOGIN: `${BASE_URL}/auth/login`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  GET_USER: `${BASE_URL}/user`,
  GET_USER_VISITED_BATHS: `${BASE_URL}/user/visited-baths`,
  GET_BATH_COMMENTS: `${BASE_URL}/bath/{bathId}/comments`,
  POST_COMMENT: `${BASE_URL}/bath/{bathId}/comment`,
  POST_VISITED_BATH: `${BASE_URL}/bath/visit`,
};

export default ENDPOINT;
