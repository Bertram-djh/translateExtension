/*
 * @Author: Bertram
 * @LastEditors: Bertram
 */
console.log('加载翻译脚本')

var oRectc = null
var textBtn = ''
var getText = ''
var tranWidth = ''
//首先创建翻译按钮
let button = document.createElement("button")
let page = document.body
button.classList.add("translateBtn")
// button.style.backgroundColor = 'red'
button.innerText = '翻译'
button.addEventListener("click", handleBtnClick)


//创建翻译后的区域
let translateDiv = document.createElement("div")

translateDiv.classList.add("translateAfter")
// translateDiv.innerText = '翻译中'
translateDiv.innerText = '翻译中'

// page.appendChild(button)
page.insertBefore(button, page.children[0])
// page.appendChild(translateDiv)
page.insertBefore(translateDiv, page.children[0])

document.body.addEventListener("mouseup", handleMouse)


function handleBtnClick() {
    button.style.display = 'none'
    translateSelect(getText)
}
function handleMouse(tar) {

    var text = ""
    if (window.getSelection) {
        // 首先清除上一个按钮
        // console.log(tar.target.classList.value == 'translateAfter');
        button.style.display = 'none'

        if (tar.target.classList.value !== 'translateAfter') {
            button.style.display = 'none'
            translateDiv.style.display = 'none'
            translateDiv.innerText = ''
            translateDiv.innerText = '翻译中'
        }


        // console.log("获取text", window.getSelection());
        text = window.getSelection().toString()
        if (text != '') {
            // console.log(text)

            // 将过滤后的字符串赋值
            getText = filterText(text)


            // 获取选中文本第一个字的信息
            let textObj = window.getSelection().getRangeAt(0)


            // 获取到元素的大小和位置信息
            const oRect = textObj.getBoundingClientRect()
            // console.log(oRect)
            oRectc = oRect
            button.style.left = oRect.right - 50 + 'px'
            button.style.top = oRect.top - 30 + 'px'
            if (tar.target.classList.value == 'translateAfter') {
                button.style.display = 'none'
            } else {
                button.style.display = 'block'
            }


        }
    }
}

function translateSelect(sel) {

    // 个人appid替换
    var appid = '20220918001516351'

    // 个人密钥替换
    var key = 'ydRcP7GJeht4zDxxx71U'

    var salt = (new Date).getTime()
    // var fromL = 'en'
    // var toL = 'zh'
    // var query = 'apple'
    var query = sel
    // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
    chrome.storage.sync.get(['from', 'to'], (res) => {
        console.log(res);
        fromL = res.from
        toL = res.to
        var str1 = appid + query + salt + key
        var sign = MD5(str1)
        sendTo(`https://api.fanyi.baidu.com/api/trans/vip/translate?q=${query}&from=${fromL}&to=${toL}&appid=${appid}&salt=${salt}&sign=${sign}`)
    })



}
// 过滤选中的字符串
function filterText(val) {
    let index = ''
    for (let i = 0; i < val.length; i++) {
        if (val[i] == '&') {
            index += ' '
        } else {
            index += val[i]
        }
    }
    index = index.replace(/(\r|\n)/gi, "")
    return index
}

// 向背景页发消息
function sendTo(val) {
    console.log("发送消息");
    chrome.runtime.sendMessage({ greeting: val }, response => {
        console.log(response)
        renderDiv(response)
    })
}

// 渲染翻译框
function renderDiv(val) {
    translateDiv.innerText = ''
    translateDiv.style.maxWidth = oRectc.width + 'px'
    translateDiv.innerText = val
    translateDiv.style.display = 'block'
    translateDiv.style.left = oRectc.left + 'px'
    translateDiv.style.top = oRectc.top - translateDiv.offsetHeight - 1 + 'px'
}
