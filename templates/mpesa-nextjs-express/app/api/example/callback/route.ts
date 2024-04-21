export default async function POST(request: Request) {
    const body = await request.json()

    console.info(`
    Mpesa Callback
  
    Request Body: ${body}
  
    Request STK Callback: ${body?.Body?.stkCallback}
  
    Request STK Metadata: ${body?.Body?.stkCallback?.CallbackMetadata?.Item}
    
    `)

    Response.json({ success: true })
}
