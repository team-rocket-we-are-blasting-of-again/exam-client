const gatewayURL = "http://localhost:9999/";

const links = {
  register: {
    customer: "customers/v1/customers/registration",
    courier: "courier/register",
    restaurant: "restaurant/register",
  },
  login: {
    customer: "auth/customer/login",
    courier: "auth/courier/login",
    restaurant: "auth/restaurant/login",
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
    return fetch(gatewayURL + links.register[role], options).then(
      handleHttpErrors
    );
  };

  //.........................\\

  const login = (email, password, role) => {
    const options = makeOptions("POST", true, {
      email: email,
      password: password,
    });
    const url = gatewayURL + links.login[role];
    console.log(url);
    return fetch(url, options).then(handleHttpErrors);
  };

  const claimOrDropTask = (body, role_id, action) => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        role_id: role_id,
      },
      body: JSON.stringify(body),
    };
    return fetch(gatewayURL + action, options).then(handleHttpErrors);
  };
  const getClaimedTasks = (role_id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        role_id: role_id,
      },
    };
    return fetch(gatewayURL + "courier/claimed", options).then(
      handleHttpErrors
    );
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
    registerUser,
    fetchAnyGET,
    fetchNoOptions,
    claimOrDropTask,
    getClaimedTasks,
  };
}
const facade = apiFacade();

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ res });
  }
  return res.json();
}
export default facade;
