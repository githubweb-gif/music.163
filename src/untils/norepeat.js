import deepCopy from './deepCopy'
export default function norepeat (oldArr, replaceArr, current) {
  let index
  oldArr = deepCopy(oldArr)
  replaceArr = deepCopy(replaceArr)
  const length = replaceArr.length
  replaceArr.push(...oldArr)
  const newArr = unique(replaceArr)
  const arr3 = newArr.splice(0, length)
  newArr.forEach((x, n) => {
    if (x.id === current && !index) {
      index = n
      console.log(index)
    }
  })
  if (!index && index !== 0) {
    index = newArr.length - 1
  }
  newArr.splice(index + 1, 0, ...arr3)
  return newArr
}

function unique (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i].id === arr[j].id) { // 第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1)
        j--
      }
    }
  }
  return arr
}
