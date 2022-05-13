export function localGet(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

export function localSet(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove(key) {
  window.localStorage.removeItem(key)
}

// 生日计算
export function jsGetAge(BirthdayStr) {
  var strBirthdayArr = BirthdayStr.split('-')
  var birthYear = strBirthdayArr[0] // 生日年龄
  var birthMonth = strBirthdayArr[1] // 生日月份
  var birthDay = strBirthdayArr[2] // 生日日期

  const d = new Date()
  var nowYear = d.getFullYear() // 当前年
  var nowMonth = d.getMonth() + 1 // 当前月
  var nowDay = d.getDate() // 当前日

  var ageY = nowYear - birthYear // 岁
  var ageM // 月
  var ageT // 天

  if (birthDay > nowDay) {
    nowMonth = nowMonth - 1
    if (nowMonth === 0) {
      ageY = ageY - 1
      nowMonth = 12
      nowDay = nowDay + 31
    } else {
      if (nowMonth === 11) {
        nowDay = nowDay + 30
      } else if (nowMonth === 10) {
        nowDay = nowDay + 31
      } else if (nowMonth === 9) {
        nowDay = nowDay + 30
      } else if (nowMonth === 8) {
        nowDay = nowDay + 31
      } else if (nowMonth === 7) {
        nowDay = nowDay + 31
      } else if (nowMonth === 6) {
        nowDay = nowDay + 30
      } else if (nowMonth === 5) {
        nowDay = nowDay + 31
      } else if (nowMonth === 4) {
        nowDay = nowDay + 30
      } else if (nowMonth === 3) {
        nowDay = nowDay + 31
      } else if (nowMonth === 2) {
        if ((nowYear % 4 === 0 && nowYear % 100 !== 0) || nowYear % 400 === 0) {
          nowDay = nowDay + 28
        } else {
          nowDay = nowDay + 29
        }
      } else if (nowMonth === 1) {
        nowDay = nowDay + 31
      }
    }
    ageT = nowDay - birthDay
  } else {
    ageT = nowDay - birthDay
  }
  if (birthMonth > nowMonth) {
    ageY = ageY - 1
    nowMonth = nowMonth + 12
    ageM = nowMonth - birthMonth
  } else {
    ageM = nowMonth - birthMonth
  }
  var age = ''
  if (ageY < 0) {
    age = '-1'
  } else if (ageY === 0) {
    if (ageM === 0) {
      age = ageT + '天'
    } else {
      age = ageM + '个月' + ageT + '天'
    }
  } else if (ageY % 1 !== 0) {
    age = ageY + '周岁' + ageM + '个月'
  } else if (ageY % 1 === 0) {
    age = ageY + '周岁'
  }
  return age
}

// 是否绝育
export function isKC(kc) {
  return kc === 0 ? '否' : '是'
}

// 性别判断
export function sex(sex) {
  return sex === 0 ? '女孩子' : '男孩子'
}

export function levelFilter(value) {
  if (value === 0) {
    return '一级'
  } else if (value === 1) {
    return '二级'
  }
}

export function disableNextLevel(value) {
  if (value === 0) {
    return false
  } else if (value === 1) {
    return true
  }
}

export const jsGetYear = (day) => {
  if (day) {
    const strArr = day.split('-')
    const Year = strArr[0]
    const Month = strArr[1]
    const Day = strArr[2]
    // 获取当前时间
    const d = new Date()
    const nowYear = d.getFullYear()
    const nowMonth = d.getMonth() + 1
    const nowDay = d.getDate()

    let yearNumber

    // 计算周岁差
    if (nowYear === Year) {
      yearNumber = 0 // 同年 则为0年
    } else {
      var ageDiff = nowYear - Year // 年之差
      if (ageDiff > 0) {
        if (nowMonth === Month) {
          var dayDiff = nowDay - Day // 日之差
          if (dayDiff < 0) {
            yearNumber = ageDiff - 1
          } else {
            yearNumber = ageDiff
          }
        } else {
          var monthDiff = nowMonth - Month // 月之差
          if (monthDiff < 0) {
            yearNumber = ageDiff - 1
          } else {
            yearNumber = ageDiff
          }
        }
      } else {
        yearNumber = -1 // 输入有误
      }
    }
    return yearNumber
  }
}

export const formatStatus = (value) => {
  if (value === 1) {
    return '待付款'
  } else if (value === 2) {
    return '已发货'
  } else if (value === 3) {
    return '已完成'
  } else if (value === 0) {
    return '已取消'
  } else if (value === 4) {
    return '待发货'
  }
}

export const formatOrderType = (value) => {
  if (value === 1) {
    return '1小时达订单'
  } else {
    return '商城订单'
  }
}

export const formStatus = (value) => {
  if (value === 5) {
    return '待处理'
  } else if (value === 6) {
    return '退货中'
  } else if (value === 7) {
    return '已完成'
  } else if (value === 8) {
    return '已拒绝'
  }
}
