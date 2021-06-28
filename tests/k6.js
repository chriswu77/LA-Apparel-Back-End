/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  // vus: 10,
  stages: [
    { duration: '1s', target: 1 },
    { duration: '30s', target: 10 },
    { duration: '1m', target: 100 },
    { duration: '5m', target: 1000 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
  },
};

export default function () {
  group('get list of products', () => {
    const res = http.get('http://localhost:4000/api/products/list/190000/5');
    check(res, { 'status was 200': (r) => r.status === 200 });
  });

  group('select a specific product', () => {
    const res = http.get('http://localhost:4000/api/products/1000000');
    check(res, { 'status was 200': (r) => r.status === 200 });
  });

  group('get a product\'s styles', () => {
    const res = http.get('http://localhost:4000/api/products/1000000/styles');
    check(res, { 'status was 200': (r) => r.status === 200 });
  });

  group('get a product\'s related items', () => {
    const res = http.get('http://localhost:4000/api/products/1000000/related');
    check(res, { 'status was 200': (r) => r.status === 200 });
  });

  sleep(1);
}
