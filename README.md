## 1、插件使用说明

本插件配置版本manifest V3，基于原生js。使用时只需在页面选中文本，会弹出翻译按钮，点击即可翻译。

百度翻译api（免费）通用翻译每月5万字符，（免费）高级版每月100万字符，具体可查看官方说明

1.2、注册百度翻译平台获取appid和密钥

注册链接：http://api.fanyi.baidu.com/

![image-20220919191405435](E:\Roaming1\Typora\typora-user-images\image-20220919191405435.png)

1.2、在百度翻译开放平台、管理控制下拿到自己的appid和密钥，替换content-script.js文件中的字段

![image-20220919191658474](E:\Roaming1\Typora\typora-user-images\image-20220919191658474.png)

将文件中的字段替换成自己的信息

1.3、安装插件

- chrome浏览器的地址栏输入：`chrome://extensions/`
- 在右上角会找到一个开关：“开发者模式”
- 打开开关后，会发现在插件的页面内出现三个按钮：“加载已解压的扩展程序”、“打包扩展程序”、“更新”
- 点击“加载已解压的扩展程序”，选择自己刚刚的插件根目录即可成功加载自己的插件了

## 2、主要文件说明

![aHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9zdGF0aWMvaW1hZ2VzL292ZXJ2aWV3L2NvbnRlbnRzY3JpcHRhcmMucG5n](E:\desktop\图片\aHR0cHM6Ly9kZXZlbG9wZXIuY2hyb21lLmNvbS9zdGF0aWMvaW1hZ2VzL292ZXJ2aWV3L2NvbnRlbnRzY3JpcHRhcmMucG5n.png)

1、manifest.json
	每一个chrome的插件都需要有一个manifest.json配置文件，官方文档地址：https://developer.chrome.com/docs/extensions/mv3/getstarted/#next-steps
2、service-worker.js 
	主js文件，可以把它看作为web应用与chrome浏览器之间的“代理服务器”，它可以监听、修改、拦截web应用的资源和请求。编辑刚才的manifest.json配置文件，并在之前的基础上增加脚本，完整代码如下：

```json
{
  "name": "app",
  "description": "我的chrome插件",
  "version": "1.0",
  "manifest_version": 3,
  "background": {
    "service_worker": "service-worker.js"
  }
}
```

​	在chrome插件开发里，大部分的API都需要在`manifest.json`配置文件先注册，再使用，因此我们需要继续编辑`manifest.json`，完整代码如下：

```
  "permissions": [
    "activeTab",
    "tabs",
    "notifications",
    "storage",
    "scripting"
  ]
```

3、hello.html

​	点击插件弹出的插件显示页面，可以理解为可视化配置页面，其js文件放在js目录下

3、options.html

​	右键插件图标的选项页面

4、content-script

​	注入浏览器页面的js脚本，同样的需要先在manifest文件中注册

```json
  "content_scripts": [
    {
      "matches": [
        "<all_urls>"
      ],
      "css": [
        "/css/mystyle.css"
      ],
      "js": [
        "/js/md5.js",
        "content-script.js"
      ],
      "all_frames": true,
      "run_at": "document_idle"
    }
  ]
```

其中mystyle.css是注入页面的css文件，可以修改页面中的样式

### 3、页面通信

​	content_script，background，popup三者之间通信是调用的chrome API，他们有：

- chrome.extension.getBackgroundPage()

- chrome.extension.getViews({type:‘popup’}

- chrome.tabs.sendMessage

- chrome.runtime.sendMessage

- chrome.runtime.onMessage.addListener

  background请求外部接口没有跨域限制

![20200630171311132](E:\desktop\demo\chorme插件开发\20200630171311132.png)

![img](https://upload-images.jianshu.io/upload_images/20967772-6d7761bd9e08c336.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

![img](https://img-blog.csdnimg.cn/20201020190039836.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2pveTE3OTM=,size_16,color_FFFFFF,t_70#pic_center)