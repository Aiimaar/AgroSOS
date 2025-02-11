import axios from 'axios';

// const API = "http://localhost:8080/api/subscriptions";
const API = process.env.REACT_APP_API_URL;


async function regSw() {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/sw.js';
    const reg = await navigator.serviceWorker.register(url, { scope: '/' });
    return reg;
  }
  throw Error('serviceworker not supported');
}

async function subscribe(serviceWorkerReg, subscriptionName) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_PUBLIC_KEY
      //applicationServerKey: 'BOP1vbXrhHeb_sbD-2GieGRqd82oqmRg05w1t9WMz-Fk3Myi3FqmgsgsrvuRyI6r-owsIPLsK9JS-temIlRfHQc',
      // TODO: Public VAPID key should only be in .env
    });
    axios.post(`${API}/subscribe`, { subscriptionName: subscriptionName, subscription: subscription });
  }
}

export {
  regSw,
  subscribe,
};