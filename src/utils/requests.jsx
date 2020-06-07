// Default options are marked with *
const defaultOptions = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

export const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
    ...defaultOptions
  });
  return response.json();
}

export const postFile = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    ...defaultOptions,
    body: data
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

export const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    ...defaultOptions,
    body: data
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
