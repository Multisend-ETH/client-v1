import axios from "axios";

const baseUrl = "https://multisend-backend-tcbhbzpkes.now.sh/api";

const getFromGSheet = async url => {
  //const res =  {addresses:['a','b','c'], amount: [1,2,3]}
  const res = await axios.post(`${baseUrl}/get-data-from-sheet`, url);
  return res.data;
};

const Api = {
  getFromGSheet
};

export default Api;
