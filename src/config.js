const config = {
  abortLink: '/abort',

  // Page linking
  intro: {
    next: '/pin',
  },
  pin: {
    next: '/withdraw',
    back: '/',
  },
  withdraw: {
    next: '/delivery',
    back: '/pin',
  },
  delivery: {
    next: '/cashin',
    back: '/withdraw',
  },
  cashin: {
    back: '/withdraw',
    next: '/'
  },
  abort: {
    next: '/',
  }
};

export default config;
