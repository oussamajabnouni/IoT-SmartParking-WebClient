
import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://pacific-everglades-71526.herokuapp.com/api/';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  upload: (url,file) =>
    superagent.post(`${API_ROOT}${url}`).use(tokenPlugin).attach('image',file).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: () =>
    requests.get('/admin'),
  getAll: () => 
    requests.get('/admins'),
  login: (email, password) =>
    requests.post('/admins/login', { user: { email, password } }),
  register: (email,share) =>
    requests.post('/admins', { email,share}),
  save: user =>
    requests.put('/admin', { user }),
  withdraw: () =>
    requests.put('/withdraw')
};


const Parkings = {
  getAll: () => 
    requests.get('/parkings'),
  byOwner: () => 
    requests.get('/parkings/byowner'),
  add: (form) => 
    requests.post('/parkings',form),
  update: (id,parking) => 
    requests.put(`/parkings/${id}`,{parking}),
  getOne: (id) => 
    requests.get(`/parkings/${id}`),
  delete: (id) => 
    requests.delete(`/parkings/${id}`),
  upload: (file) => 
    requests.upload(`/parkings/upload/`,file)
};

const Reservations = {
  get: () => 
    requests.get('/reservations/'),
  dashboard: () => 
    requests.get('/reservations/dashboard'),
  add: (parking,price,period) => 
    requests.post('/reservations',{parking,price,period}),

};


export default {
  Parkings,
  Reservations,
  Auth,
  setToken: _token => { token = _token; }
};
