react-nano-payment
==================

This React component lets you easily accept NANO payments on your website.

Install
-------

    npm i --save react-nano-payment

Usage
-----

    import {NanoPaymentModal} from 'react-nano-payment';

    <NanoPaymentModal
      account={account}
      amount={amount}
      show={show}
      onClose={() => setShow(false)}
      onSuccess={({id, block_hash}) => {...}}
      onError={err => {...}}
    />

| Prop name  | Type     | Required | Description                                               |
| ---------- | -------- | -------- | --------------------------------------------------------- |
| title      | string   | no       | Title of the modal (default: 'NANO Payment Request')      |
| apiURL     | string   | no       | Payment server URL to use (default: 'https://gonano.dev') |
| account    | string   | yes      | Address of the account to receive on                      |
| amount     | string   | yes      | Amount in NANO to receive                                 |
| paymentID  | string   | no       | Wait on this payment ID instead of creating a new payment |
| show       | bool     | yes      | Whether to show the modal                                 |
| onClose    | function | yes      | Handler when modal is closed                              |
| onSuccess  | function | yes      | Handler when payment is fulfilled                         |
| onError    | function | yes      | Handler when an error occurs                              |

If `paymentID` is supplied then `account` must be the one returned from the `/payment/new` API call.
