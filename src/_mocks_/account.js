// ----------------------------------------------------------------------

const account = {
  displayName: `${window.localStorage.getItem('fname')} ${window.localStorage.getItem('lname')}`,
  email: `${window.localStorage.getItem('emailId')}`,
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

export default account;
