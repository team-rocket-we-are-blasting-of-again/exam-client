const courierURL = "http://localhost:9088/"
const restaurantURL = "http://localhost:9080/"
const links = {
  register: {
    customer: "customerURL",
    courier: "register",
    restaurant: "register",
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
    return fetch(courierURL + action, options).then(handleHttpErrors);
  };
  const getClaimedTasks = (role_id) => {
    const options = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        role_id: role_id,
      }      
    };
    return fetch(courierURL+"claimd-tasks", options).then(handleHttpErrors);
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
    getClaimedTasks
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
