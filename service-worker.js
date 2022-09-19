/*
 * @Author: Bertram
 * @LastEditors: Bertram
 */
// 默认源语言设置自动检测
// let from = 'en'
// let to = 'zh'

// 首次安装更新、插件更新、chrome浏览器更新时触发
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ from:'auto', to:'zh' })
})
// 监听来自content_script的消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
  console.log(message, sender);
  fetch(message.greeting)
  .then(res => res.json() ).then(res => {
    console.log(res)
    if ((Object.keys(res)).length == 3) {
      sendResponse(res.trans_result[0].dst)
    } else {
      sendResponse(res.error_code)
    }
  }).catch(err => {
    console.log(err)
  })
  // 异步连接
  return true
})
