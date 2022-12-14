const links = {
  register: {
    customer: "customerURL",
    courier: "http://localhost:9088/register",
    restaurant: "http://localhost:9080/register",
  },
  login: {
    customer: "customerURL",
    courier: "http://localhost:9088/register",
    restaurant: "http://localhost:9080/register",
  },
};

function apiFacade() {
  //............registerUser..............\\
  const registerUser = (user, role) => {
    console.log(user);
    const options = makeOptions("POST", false, {
      ...user,
    });
    console.log(options);
    return fetch(links.register[role], options).then(handleHttpErrors);
  };

  //.........................\\

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options).then(handleHttpErrors);
  };

  const fetchData = (url2) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + url2, options).then(handleHttpErrors);
  };

  const fetchAnyGET = (URL) => {
    const options = makeOptions("GET", false);
    return fetch(URL, options).then(handleHttpErrors);
  };
  const fetchNoOptions = (URL) => {
    return fetch(URL).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    login,
    fetchData,
    registerUser,
    fetchAnyGET,
    fetchNoOptions,
  };
}
const facade = apiFacade();

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}
export default facade;
