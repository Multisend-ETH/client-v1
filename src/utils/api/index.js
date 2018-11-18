import axios from "axios";

const baseUrl = "https://multisend-dalecoin-bounty.a3c1.starter-us-west-1.openshiftapps.com/api";

const getFromGSheet = async url => {
  //const res =  {addresses:['a','b','c'], amount: [1,2,3]}
  const res = await axios.post(`${baseUrl}/get-data-from-sheet`, url);
  return res.data;
};

const Api = {
  getFromGSheet
};

export default Api;
