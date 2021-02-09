import {useState, useEffect} from 'react';

async function postData(url, data, signal) {
  const resp = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
    signal,
  });
  if (resp.status != 200) {
    throw new Error(await resp.text());
  }
  return await resp.json();
}

export default function useNanoPayment({
  apiURL = 'https://gonano.dev',
  account, amount, show, onSuccess, onError,
}) {
  const [account2, setAccount] = useState('');

  useEffect(() => {
    if (!show) return;
    const controller = new AbortController;
    const {signal} = controller;
    let id;

    (async () => {
      let data;
      setAccount('');
      try {
        data = await postData(`${apiURL}/payment/new`, {account, amount}, signal);
      } catch (err) {
        if (err.name != 'AbortError') onError(err);
        return;
      }
      id = data.id;
      setAccount(data.account);
      while (true) {
        try {
          data = await postData(`${apiURL}/payment/wait`, {id}, signal);
          break;
        } catch (err) {
          if (err.name == 'AbortError') return;
        }
        await new Promise(res => setTimeout(res, 3e3));
      }
      id = '';
      onSuccess(data);
    })();

    return () => {
      controller.abort();
      if (id) postData(`${apiURL}/payment/cancel`, {id}).catch(onError);
    };
  }, [account, amount, show]);

  return account2;
}
