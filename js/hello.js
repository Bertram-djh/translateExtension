/*
 * @Author: Bertram
 * @LastEditors: Bertram
 */
// let changeColor = document.getElementById("changeColor");


// 获取存储的语言设置
chrome.storage.sync.get(['from', 'to'], (res) => {
  console.log(res);
  if (res.from) {
    // 将select选中
    foreachLang(objFrom, res.from)
  }
  if (res.to) {
    // 将select选中
    foreachLang(objTo, res.to)
  }
})

var objFrom = document.getElementById("from")
var objTo = document.getElementById("to")

objFrom.onchange = fromHandle
objTo.onchange = toHandle

// 获取select选中的value并存储
function fromHandle() {
  var langFrom = objFrom.options[objFrom.selectedIndex].value
  chrome.storage.sync.set({ from: langFrom }, () => {
    console.log("源语言存储成功")
  })
  console.log(langFrom)
}

// 获取select选中的value并存储
function toHandle() {
  var langTo = objTo.options[objTo.selectedIndex].value
  chrome.storage.sync.set({ to: langTo }, () => {
    console.log("存储成功")
  })
  console.log(langTo)
}

// 遍历select，选中匹配项
function foreachLang(sel, val) {
  for (let i = 0; i < sel.options.length; i++) {
    if (sel.options[i].value == val) {
      sel.selectedIndex = i
      break
    }
  }
}