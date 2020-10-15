import HttpRequest from '@/until/request';
const baseURL = 'http://localhost:8001';
/**
 * 获取首页默认地址
 */
export const getMistedata = async () => {
  return HttpRequest({
    method: 'get', // 如果是get方法可省
    body: { type: 'guess' }, //  所有方法传参都通过body，没有省略即可
  })(`${baseURL}/v1/cities`)
    .then(res => res)
    .catch(err => err);
};
