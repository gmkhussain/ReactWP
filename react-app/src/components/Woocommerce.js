import axios from "axios";
import Oauth from "oauth-1.0a";
import CryptoJS from "crypto-js";
import jQuery from "jquery";

import clientConfig from '../config/client-config';


const ck = "ck_e23d2e0cdfced671b30dd3629332bfd1a9a3d64f";
const cs = "cs_efc1cfbaf33f90dc5a95f8e59129c4d5c5471995";

const baseURL = clientConfig.rootUrl+'/wp-json';

const Woocommerce = {
  getProducts: () => {
    return makeRequest("/wc/v3/products");
  },
  getProductByID: id => {
    return makeRequest("/wc/v3/products/" + id);
  }
};

function makeRequest(endpoint, method = "GET") {
  const oauth = getOauth();

  const requestData = {
    url: baseURL + endpoint,
    method
  };

  const requestHTTP =
    requestData.url + "?" + jQuery.param(oauth.authorize(requestData));

  console.log( "requestHTTP", requestHTTP )

  return axios.get(requestHTTP);
}

function getOauth() {
  return Oauth({
    consumer: {
      key: ck,
      secret: cs
    },
    signature_method: "HMAC-SHA1",
    hash_function: function(base_string, key) {
      return CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA1(base_string, key));
    }
  });
}

export default Woocommerce;