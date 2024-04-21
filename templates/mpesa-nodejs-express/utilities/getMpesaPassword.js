import datetime from 'node-datetime';
import variables from './variables.js';

const dt = datetime.create();
const formatedDT = dt.format('YmdHMS');

const getMpesaPassword = () => {
  const password = Buffer.from(
    variables.MPESA_SHORTCODE + variables.MPESA_PASSKEY + formatedDT
  ).toString('base64');

  return { password, timestamp: formatedDT };
};

export default getMpesaPassword;
