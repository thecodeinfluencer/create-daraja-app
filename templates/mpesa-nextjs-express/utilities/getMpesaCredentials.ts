import variables from './variables.js'
import axios from 'axios'

const getMpesaCredentials = async () => {
    let credential = {}

    const config = {
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${variables.MPESA_CONSUMER_KEY}:${variables.MPESA_CONSUMER_SECRET}`
            ).toString('base64')}`,
        },
    }

    await axios
        .get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            config
        )
        .then((resp) => (credential = resp.data))
        .catch((error) => console.error({ error: error.message }))

    return credential
}

export default getMpesaCredentials
