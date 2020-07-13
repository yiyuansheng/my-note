/**
* 获取地址栏参数
* */
function getUrlParams() {
  // search部分
  let search = location.search
  search = search.split('?')
  if (search[1]) {
    search = search[1]
    let index = search.indexOf('/')
    if (index > 0) {
      search = search.substring(0, index)
    }
  }
  else search = ''
  // 哈希部分
  let hash = location.hash
  hash = hash.split('?')
  if (hash[1]) hash = hash[1]
  else hash = ''
  const arrSearch = search.split('&')
  const arrHash = hash.split('&')
  const params = {}
  // 切割参数
  arrSearch.forEach(item => {
	let arr = item.split('=')
	if (!params[arr[0]] && arr.length === 2) params[arr[0]] = arr[1]
  })
  arrHash.forEach(item => {
	let arr = item.split('=')
	if (!params[arr[0]] && arr.length === 2) params[arr[0]] = arr[1]
  })
  console.log(params)
  return params
}
getUrlParams()