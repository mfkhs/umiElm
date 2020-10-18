import React, { useState, useEffect } from 'react';
import { history } from 'umi';
import { NavBar, Icon } from 'antd-mobile';
import styles from './index.less'
import { resCityGuess, resHotcity, resGroupcity } from '@/until/api'
import { sortgroupcity } from '@/until/util'
import { cityItem } from '@/until/tsinfarfance'


const Home = () => {
  //guessCity :当前默认城市name id,  hotcity:热门城市列表 ,  groupcity:所有城市列表
  const [data, setData] = useState({ guessCity: { name: '', id: '' }, hotcity: [], groupcity: {} })

  useEffect(() => {
    // 更优雅的方式
    const fetchData = async () => {
      const hotcity = await resHotcity()
      const groupcity = await resGroupcity()
      const guessCity = await resCityGuess()
      setData({ guessCity, hotcity, groupcity })
    }
    fetchData();
  }, []);
  const guessCityUi = () => {
    const guessCitys = sortgroupcity(data.groupcity)

  }
  const toRoute = (path: string, id?: number) => {
    history.push(path + `/${id}`)
  }
  return (
    <div>
      {/* 头部 */}
      <NavBar className={styles.header_top}
        mode="dark"
        leftContent="elm.me"
        onLeftClick={() => window.location.reload()}
        rightContent={[
          <span key='0' onClick={() => toRoute('/login')
          }>登录|注册</span>
        ]}>
      </NavBar>
      {/* 城市选择提示 */}
      <nav className={styles.city_nav}>
        <div className={styles.city_tip}>
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
      </nav>
      {/* 定点城市  选择城市*/}
      <div className={styles.select_city}>
        <NavBar
          mode="light"
          leftContent={data.guessCity.name}
          rightContent={[
            <Icon
              onClick={() => history.push({ pathname: '/city', query: { id: data.guessCity.id } })}
              key="0" size="sm" type="right" color="#999" />,
          ]}
        ></NavBar>
      </div>
      {/* 热门城市 */}
      <section className={styles.hot_city_container}>
        <h4 className={styles.city_title}>热门城市</h4>
        <ul className={styles.citylistul}>
          {
            data.hotcity.map((item: cityItem, index: number) => {
              return (<li onClick={() => toRoute('/city', item.id)} key={`${index}` + item.area_code}>{item.name}</li>)
            })
          }
        </ul>
      </section>
      {/* 侧面字母城市排序 */}
      <section className="group_city_container">
        <ul className="letter_classify" >
          {
            Object.keys(sortgroupcity(data.groupcity)).map((itemkey: string, index: number) => {
              return (
                <li className={styles.letter_classify_li} key={itemkey + index}>
                  <h4 className={styles.city_title}>{itemkey}
                    <span>{index !== 0 ? '' : '按字母排序'}</span>
                  </h4>
                  <ul className={styles.citylistul}>
                    {
                      sortgroupcity(data.groupcity)[itemkey].map((item: cityItem, index: number) => {
                        return (
                          <li className={`ellipsis ${styles.title}`} key={`${index}${item.id}`}
                            onClick={() => toRoute('/city', item.id)}
                          >{item.name}</li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </section>
    </div>
  );
};

export default Home