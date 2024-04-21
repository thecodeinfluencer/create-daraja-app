export const stkCallback = async (req, res, next) => {
  console.info(`
  Mpesa Callback

  Request Body: ${req.body}

  Request STK Callback: ${req.body?.Body?.stkCallback}

  Request STK Metadata: ${req.body?.Body?.stkCallback?.CallbackMetadata?.Item}
  
  `);

  res.send({ success: true });
};
