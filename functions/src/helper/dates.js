const _getNormalized = (val) => {
  if (val < 10) {
    return '0' + val
  }
  return val
}

const getNow = () => {
  const today = new Date()
  let hh = today.getHours()
  let mm1 = today.getMinutes()
  let ss = today.getSeconds()

  let dd = today.getDate()
  let mm = today.getMonth() + 1

  let yyyy = today.getFullYear()

  dd = _getNormalized(dd)
  mm = _getNormalized(mm)
  hh = _getNormalized(hh)
  mm1 = _getNormalized(mm1)
  ss = _getNormalized(ss)

  return hh + ':' + mm1 + ':' + ss + '_' + dd + '-' + mm + '-' + yyyy
}

// '12/11/2020' <-> 'yyyy'
export const getToday = () => {
  const today = new Date()

  let dd = today.getDate()
  let mm = today.getMonth() + 1

  let yy = today.getFullYear()
  dd = _getNormalized(dd)
  mm = _getNormalized(mm)
  yy = _getNormalized(yy)
  
  return mm + '/' + dd + '/' + yy
}
