import React, { useState, useEffect, useRef } from 'react';
import { IRouteProps, history } from 'umi'
import { NavBar, Icon, SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import styles from './index.less'
import { resCurrentcity, reqSearchplace } from '@/until/api';
import { setStore, getStore, removeStore } from '@/until/util';

interface placelistProps {
  address?: string;
  geohash?: string;
  latitude?: number;
  longitude?: number
  name?: string;
}
interface placelistState {
  placelist: [placelistProps];
  historytitle: boolean;
  placeNone: boolean;
}
interface placeHistoryState {
  placeHistory: [placelistProps]
}

const City = (props: IRouteProps) => {
  const pathname = props.location.pathname
  const inputBar = useRef<any>(null);
  const [currentcity, setCurrentcity] = useState({ name: '', id: 0 })
  const [placeHistory, setPlaceHistory] = useState<placeHistoryState>({ placeHistory: [] })
  // 搜索无结果，显示提示信息
  const [placelist, setPlacelist] = useState<placelistState>({ placelist: [], historytitle: false, placeNone: false })

  useEffect(() => {
    // 更优雅的方式
    const fetchData = async () => {
      const currentcitys = await resCurrentcity(pathname.substring(6))
      setCurrentcity(currentcitys)
    }
    fetchData();
    initHistory()
  }, [currentcity.name]);

  //初始化搜索历史
  const initHistory = () => {
    const initData = getStore('placeHistory')
    // console.log(initData)
    if (initData) {
      setPlacelist(placelist => {
        return { placelist: JSON.parse(initData), historytitle: true, placeNone: false }
      })
      console.log(placelist, initData)
    } else {
      setPlacelist(placelist => {
        return { placelist: [], historytitle: false, placeNone: false }
      })
    }
  }
  const postpois = async () => {
    // console.log(inputBar.current.state.value) 输入值不为空时才发送信息
    if (inputBar.current.state.value) {
      const placelists = await reqSearchplace(currentcity.id, inputBar.current.state.value)
      setPlacelist(placelist => {
        return { placelist: placelists, historytitle: false, placeNone: placelist.placelist.length ? false : true }
      })
    }
    console.log(placelist, '请求')

  }
  /**
 * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
 * 如果没有则新增，如果有则把塔提到最前面，判断完成后进入Msite页面
 */
  const nextPages = (item: placelistProps, index: number) => {
    let historys = getStore('placeHistory')
    let historyArr: any = []
    let checkrepeat = false;

    // 判断 有没有placelistProps的存储
    if (historys) {
      historyArr = JSON.parse(historys)
      historyArr.map((items: placelistProps, index: number) => {
        // 判断是否为同一个搜索
        console.log(historyArr, items)
        if (items.geohash == item.geohash) {
          checkrepeat = true
          console.log(historyArr, items, 'you', index)
        }
      })
      if (!checkrepeat) {
        historyArr.push(item)
        console.log(historyArr, 'meiyou', item, checkrepeat, index)
      }
    } else {
      historyArr.push(item)
    }
    setPlaceHistory({ placeHistory: historyArr })
    setStore('placeHistory', historyArr)
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
        {currentcity.name}
      </NavBar>
      <WhiteSpace />
      <div className={styles.search_bar}>
        <SearchBar placeholder="输入学校、商务楼、地址" ref={inputBar} /><WhiteSpace />
        <Button onClick={() => postpois()} type="primary" className={styles.search_btn} size='small'>提交</Button><WhiteSpace />
      </div>
      {
        placelist.historytitle ? <header className={styles.pois_search_history}>搜索历史</header> : ''
      }
      <ul className={styles.getpois_ul}>
        {
          placelist.placelist.map((item: placelistProps, index: number) => {
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
        placelist.historytitle ? <footer className={styles.clear_all_history} > 清空所有</footer > : ''

      }
      {
        placelist.placeNone ? <div className={styles.search_none_place}>很抱歉！无搜索结果</div > : ''
      }
    </div >
  );
};

export default City;