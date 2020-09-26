// Return true if the request contains the correct header, method, and a body
function validatePostRequest ({body, headers, method}) {
   if (body == null) return false;
   if (headers["Content-Type"] != "application/json") return false;
   if (method != "POST") return false;
   return true;
}

export default validatePostRequest;