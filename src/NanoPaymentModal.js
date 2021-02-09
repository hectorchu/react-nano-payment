import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import QRCode from 'qrcode.react';
import useNanoPayment from './useNanoPayment';
import nanoPaymentLink from './nanoPaymentLink';

export default function NanoPaymentModal(props) {
  const {title, amount, show, onClose} = props;
  const account = useNanoPayment(props);

  return (
    <Modal centered show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title || 'NANO Payment Request'}</Modal.Title>
      </Modal.Header>

      {account &&
        <Modal.Body>
          <p>
            Please send {amount} NANO to
            <pre style={{overflowWrap: 'break-word', whiteSpace: 'pre-wrap'}}>
              {account}
            </pre>
          </p>
          <a href={nanoPaymentLink(account, amount)}>Payment Link</a>
          <div style={{textAlign: 'center'}}>
            <QRCode value={nanoPaymentLink(account, amount)} />
          </div>
        </Modal.Body>
      }

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}
