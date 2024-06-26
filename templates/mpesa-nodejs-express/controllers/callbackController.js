export const stkCallback = async (req, res, next) => {
  console.info(
    `Mpesa Callback: ${JSON.stringify(req.body?.Body?.stkCallback)}`
  );

  res.send({ success: true });
};
