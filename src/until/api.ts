import HttpRequest from '@/until/request';
const baseURL = 'http://localhost:8001';
/**
 * 获取首页默认地址
 */
export const resCityGuess = () => {
  return HttpRequest({
    method: 'get', // 如果是get方法可省
    body: { type: 'guess' }, //  所有方法传参都通过body，没有省略即可
  })(`${baseURL}/v1/cities`)
};

/**
 * 获取首页热门城市
 */
export const resHotcity = () => {
  return HttpRequest({
    method: 'get', // 如果是get方法可省
    body: { type: 'hot' }, //  所有方法传参都通过body，没有省略即可
  })(`${baseURL}/v1/cities`)
};

/**
 * 获取首页所有城市
 */
export const resGroupcity = () => {
  return HttpRequest({
    method: 'get', // 如果是get方法可省
    body: { type: 'group' }, //  所有方法传参都通过body，没有省略即可
  })(`${baseURL}/v1/cities`)
};

/**
 * 获取当前所在城市
 */
export const resCurrentcity = (number: number) => {
  return HttpRequest({
    method: 'get', // 如果是get方法可省
  })(`${baseURL}/v1/cities/${number}`)
};



/**
 * 获取搜索地址
 */

export const reqSearchplace = (cityid: number, value: string) => {
  return HttpRequest({
    method: 'get', // 如果是get方法可省
    body: {
      type: 'search', city_id: cityid,
      keyword: value
    }
  })(`${baseURL}/v1/pois`)
}

