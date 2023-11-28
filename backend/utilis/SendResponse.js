const sendSucessResponse = async (res, user, token) => {
  res.status(200).json({
    status: "sucess",
    token,
    user,
  });
};

export default sendSucessResponse;
