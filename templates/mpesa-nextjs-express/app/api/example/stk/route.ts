import getMpesaCredentials from '@/utilities/getMpesaCredentials'
import getMpesaPassword from '@/utilities/getMpesaPassword'
import variables from '@/utilities/variables'
import axios from 'axios'

export async function POST(request: Request) {
    const { phone, amount } = await request.json()
    const { access_token } = await getMpesaCredentials()

    if (!phone || !amount)
        return Response.json(
            { message: 'Missing required values' },
            { status: 400 }
        )

    const data = {
        BusinessShortCode: variables.MPESA_SHORTCODE,
        Password: getMpesaPassword().password,
        Timestamp: getMpesaPassword().timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: variables.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: `${variables.CALLBACK_URL}/api/example/callback`,
        AccountReference: 'EXAMPLE',
        TransactionDesc: 'EXAMPLE',
    }

    const config = {
        headers: { Authorization: `Bearer ${access_token}` },
    }

    return await axios
        .post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            data,
            config
        )
        .then((resp) => Response.json(resp.data))
        .catch((error) =>
            Response.json({ message: error?.message }, { status: 400 })
        )
}
