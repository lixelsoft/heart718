import axios from 'axios';


// import { URL } from "../config";
// const API_URL = URL;

import { LOCALHOST } from "../config";
const API_URL = LOCALHOST;

export const GetMyMarkerList = () => {

  const baseUrl = API_URL+'/data/getMarkers';
  return axios.get(baseUrl)
    .then(res => res.data)
    .catch(error => {
      throw error
    }); 
}

export const AddMyMarker = (data) => {

  const baseUrl = API_URL+'/data/addMarkers';
  return axios.post(
      baseUrl, 
      data
    ).then(res => res.data)
    .catch(error => {
      throw error
    });
}

export const DelMyMarker = (data) => {

  const baseUrl = API_URL+'/data/delMarkers';
  return axios.post(
      baseUrl, 
      data
    ).then(res => res.data)
    .catch(error => {
      throw error
    });
}