import { format } from 'date-fns'
import variables from './variables'

const formattedDT = format(new Date(), 'yyyyMMddHHmmss')

const getMpesaPassword = () => {
    const password = Buffer.from(
        `${variables.MPESA_SHORTCODE}${variables.MPESA_PASSKEY}${formattedDT}`
    ).toString('base64')

    return { password, timestamp: formattedDT }
}

export default getMpesaPassword
