# killglobal
kill global variable in project 

# Useage - 使用说明
#### 使用npm安装:
``
  $ npm install killglobal
``
#### 使用1： wx.navigateTo

* page1/index.js

```
  import { getKGWechat } from "killglobal";
  const WX = getKGWechat(); // 获取微信版的实例
  const _page = WX.page({
    data:{},
    onLoad(){},
    bindTap(){ // 监听点击事件，跳转到page2
      let _options = {order_id:'1223',product_id:'1099'};
      let _largeData = {name:'koman',age:'99',address:'shanghai'};
      let _from = "page1";
      WX.router.navigateTo('/pages/page2/index', _options).withKGData(_largeData, _from);
    },
  });
  Page(_page);
```
* page2/index.js

```
  import { getKGWechat } from "killglobal";
  const WX = getKGWechat(); // 获取微信版的实例
  const _page = WX.page({
    data:{},
    onKGData(data,from){
      console.log(data) // {name:'koman',age:'99',address:'shanghai'}
      console.log(from) // "page1"
    },
    onLoad(options){
      console.log(options) // {order_id:'1223',product_id:'1099'}
    },

  });
  Page(_page);
```
#### 使用2： wx.navigateBack、wx.redirectTo、wx.reLaunch的传值

* page2/index.js

```
  import { getKGWechat } from "killglobal";
  const WX = getKGWechat(); // 获取微信版的实例
  const _page = WX.page({
    data:{},
    bindTap(){
      let _params = {moreData:{a:1,b:2}};
      WX.router.navigateBack(1).withKGData(_params); // 返回
      // WX.router.redirectTo("/pages/page1/index").withKGData(_params); // 重定向
      // WX.router.reLaunch("/pages/page1/index").withKGData(_params); // 重启
    },
  });
  Page(_page);
```
* page1/index.js

```
  import { getKGWechat } from "killglobal";
  const WX = getKGWechat(); // 获取微信版的实例
  const _page = WX.page({
    data:{},
    onKGData(data){
      console.log(data) // {moreData:{a:1,b:2}};
    },
  });
  Page(_page);
```
---
#### *您也可以使用别名来调用函数。

navigateTo——下一页：

```
  1. navigateTo(path)
  2. goto(path)
  3. push(path)
```
navigateBack——返回：

```
  1. navigateBack(delta)
  2. back(delta)
```
redirectTo——重定向：

```
  1. redirectTo(path)
  2. redirect(path)
```

## 将其引入app中快速使用

app.js

```
import { getKGWechat } from 'killglobal';

App({
    get kgrouter() {
        return getKGWechat().router;
    },
    get kgpage() {
        return getKGWechat().page;
    },
    onLaunch: function() {},
    globalData: {},
   })
```
