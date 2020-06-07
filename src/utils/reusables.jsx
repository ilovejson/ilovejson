export const ReE = (res, err, code=422) => { // Error Web Response
  if (typeof err == 'object' && typeof err.message != 'undefined') {
      err = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({
      success: false,
      error: err
  });
};

export const ReS = (res, data, code=200) => { // Success Web Response
  let send_data = {
      success: true
  };

  if (typeof data == 'object') {
      send_data = Object.assign(data, send_data); // merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(send_data)
};
