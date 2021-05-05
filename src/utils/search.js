const key = 'searchKey'

// 添加或修改搜索历史
export function setSearchHistory (value) {
  const keyWords = JSON.parse(window.sessionStorage.getItem(key)) || []
  keyWords.push(value)
  window.sessionStorage.setItem(key, JSON.stringify(keyWords))
}

// 获取搜索历史
export function getSearchHistory () {
  return JSON.parse(window.sessionStorage.getItem(key))
}

// 删除搜索历史
export function deleteSearchHistory () {
  window.sessionStorage.removeItem(key)
}
