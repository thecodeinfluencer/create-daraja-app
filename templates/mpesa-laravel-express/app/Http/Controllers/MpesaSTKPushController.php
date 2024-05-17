<?php

namespace App\Http\Controllers;

use Iankumu\Mpesa\Facades\Mpesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MpesaSTKPushController extends Controller
{

    /**
     *
     * Simulate STK PUSH using this function.
     *
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return mixed
     *
     */
    public function stkpush(Request $request)
    {
        $phone_number = $request->input('phone');
        $amount = $request->input('amount');

        /** @var \Illuminate\Http\Client\Response $response */
        $response = Mpesa::stkpush(
            phonenumber: $phone_number,
            amount: (int) $amount,
            account_number: 'EXAMPLE',
            callbackurl: route('stk.callback')
        );

        // associative array of the response body
        $result = $response->json();

        return $result;
    }

    /**
     *
     * This function is responsible for handling the callback payload sent to your application.
     * You are free to customize it to your liking.
     *
     * Also ensure you return a JSON Response as Safaricom will use this infomation to establish if the payload was delivered successfully to your application.
     *
     * The function is configured to return the json response by default.
     *
     *  @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function callback(Request $request)
    {
        $payload = json_decode($request->getContent(), true);

        Log::info('STKPush Confirmation Endpoint has been hit');

        // Access the payload sent from Safaricom and use it to your liking

        Log::info($payload);

        return response()->json([
            'ResultCode' => 0,
            'ResultDesc' => 'Success'
        ]);
    }
}
