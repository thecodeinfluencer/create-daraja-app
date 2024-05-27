import variables from './variables'
import axios from 'axios'

const getMpesaCredentials = async () => {
    const config = {
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${variables.MPESA_CONSUMER_KEY}:${variables.MPESA_CONSUMER_SECRET}`
            ).toString('base64')}`,
        },
    }

    return await axios
        .get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            config
        )
        .then((resp) => resp.data)
        .catch((error) => {
            console.error('getMpesaCredentials: ', { error: error.message })
            return {}
        })
}

export default getMpesaCredentials
