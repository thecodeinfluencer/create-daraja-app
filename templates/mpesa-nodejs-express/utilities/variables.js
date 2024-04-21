import dotenv from 'dotenv'

dotenv.config()

const {
    MPESA_SHORTCODE,
    MPESA_PASSKEY,
    MPESA_CONSUMER_KEY,
    MPESA_CONSUMER_SECRET,
    CALLBACK_URL,
} = process.env

const variables = {
    MPESA_SHORTCODE,
    MPESA_PASSKEY,
    MPESA_CONSUMER_KEY,
    MPESA_CONSUMER_SECRET,
    CALLBACK_URL,
}

export default variables
