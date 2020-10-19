import React, { useState, useEffect, useRef } from 'react';
import { IRouteProps, history, connect, Loading } from 'umi'
import { NavBar, Icon, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from './index.less'
import { setStore, getStore, removeStore } from '@/until/util';
import { cityInfo } from '@/until/tsinfarfance'



const City = (props: IRouteProps) => {
  const { city, dispatch } = props
  const inputBar = useRef<any>(null);
  // 搜索无结果，显示提示信息

  useEffect(() => {
    initHistory()
  }, []);
  //初始化搜索历史
  const initHistory = () => {
    const initData = getStore('placeHistory')
    if (initData) {
      const data = JSON.parse(initData)
      dispatch({
        type: 'city/searchCity',
        payload: { data, showClearAll: true }

      })
    }
  }
  const postpois = () => {
    if (inputBar.current.state.value) {
      dispatch({
        type: 'city/searchCity', // 如果在 model 外调用，需要添加 namespace
        payload: { cityid: city.cityInfo.id, value: inputBar.current.state.value, showClearAll: false }, // 需要传递的信息
      });
    }
  }
  /**
  * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
  * 如果没有则新增，如果有则把塔提到最前面，判断完成后进入Msite页面
  */
  const nextPages = (item: cityInfo, index: number) => {
    let historys = getStore('placeHistory')
    let historyArr: any = []
    let checkrepeat = false;

    // 判断 有没有placelistProps的存储
    if (historys) {
      historyArr = JSON.parse(historys)
      historyArr.map((items: cityInfo, index: number) => {
        // 判断是否为同一个搜索
        if (items.geohash === item.geohash) {
          checkrepeat = true
        }
      })
      if (!checkrepeat) {
        historyArr.push(item)
        console.log(historyArr, 'meiyou', item, checkrepeat, index)
      }
    } else {
      historyArr.push(item)
    }
    dispatch({
      type: 'city/saveHisyoryList',
      payload: { historyArr }
    })
    setStore('placeHistory', historyArr)
    history.push('/msite')
  }
  const clearAll = () => {
    removeStore('placeHistory')
    initHistory()
    window.location.reload()
  }
  return (
    <div>
      <NavBar className={styles.header_top}
        mode="dark"
        leftContent={[
          <Icon
            key="0" size="sm" type="left" color="#fff" />,
        ]}
        onLeftClick={() => history.goBack()}
        rightContent={[
          <span key='0' onClick={() => history.push('/home')
          }>切换城市</span>
        ]}>
        {city.cityInfo.name}
      </NavBar>
      <WhiteSpace />
      <div className={styles.search_bar}>
        <SearchBar placeholder="输入学校、商务楼、地址" ref={inputBar} /><WhiteSpace />
        <Button onClick={() => postpois()} type="primary" className={styles.search_btn} size='small'>提交</Button><WhiteSpace />
      </div>
      {
        city.showClearAll ? <header className={styles.pois_search_history}>搜索历史</header> : ''
      }
      <ul className={styles.getpois_ul}>
        {
          city.citySearch.map((item: cityInfo, index: number) => {
            return (
              <li onClick={() => nextPages(item, index)} key={`${item.geohash}${item.name}`} >
                <h4 className={`ellipsis ${styles.pois_name}`} >{item.name}</h4>
                <p className={`${styles.pois_address} ellipsis`}>{item.address}</p>
              </li>
            )
          })
        }
      </ul>
      {
        city.showClearAll ? <footer onClick={() => clearAll()} className={styles.clear_all_history} > 清空所有</footer > : ''

      }
      {
        city.showSearchData ? <div className={styles.search_none_place}>很抱歉！无搜索结果</div > : ''
      }
    </div >
  );
};

const mapStateToProps = ({ city, loading }: { city: cityInfo, loading: Loading }) => {
  console.log(city)
  return {
    city,
    loading: loading.effects['city/searchCity'],
  };
};

export default connect(mapStateToProps)(City);
