/* eslint-disable import/no-anonymous-default-export */

export default {
  mock: {
    id: (mock: string) => import(`../../../mocks/${mock}.json`).then(m => {
      m.default.filter((item: any) => item.id);
    }),
    list: (mock: string ) => import(`../../../mocks/${mock}.json`).then(m =>m.default)
  },
}

