## 使用说明：

``
npm i killglobal --save
``

项目中使用：

pages/index/index.js

``

    import { getWechat } from "killglobal";

    const BasePage = getWechat().page;
    const Router = getWechat().router;

    Page(BasePage({
        data:{},
        onTapPage1(){ // 跳转到page1
            // 
            /*
                _page_onload_params: 页面启动参数, 同url+params
                _kgData: 额外参数，传到另一个页面的数据，为了防止污染，_kgData会被深拷贝后传到page1页面
                onPage: page1的实例（page1的onLoad被回调时，onPage才会被执行）
            */
            const _page_onload_params = { onload: 'onload' };
            const _kgData = { kgdata: 'kgdata' }
            Router.push('pages/page1/index',_page_onload_params).withKGData(_kgData).onPage(page=>{
                page.showAlert();
                // 执行结果： I'm Page1!
            });
        },
    }))

``

pages/page1/index.js

``

    import { getWechat } from "killglobal";

    const BasePage = getWechat().page;
    const Router = getWechat().router;

    Page(BasePage({
        data:{},
        onKGData(data){
            console.log(params);
            // 执行结果: { kgdata: 'kgdata' }
        },
        onLoad(params){
            console.log(params);
            // 执行结果: { onload: 'onload' }
        }
        showAlert(){
            console.log("I'm Page1!");
        },
    }))

``

## 函数介绍

## navigateTo —— push页面
### getWechat().router.navigateTo(path,options)
### getWechat().router.goto(path,options)
### getWechat().router.push(path,options)

    push 页面
    router.navigateTo和另外两个功能一致，为了照顾个人习惯写了另外两个别名:goto、push

参数 :

- path: string  page的路径，绝对或相对路径

- options: JSON格式的数据 例如：{a: 1, b: 2};，此数据会拼接到path（path?a=1&b=2）后面，在onLoad的入参options中捕获

## redirectTo —— 重定向
### getWechat().router.redirectTo(path,options)
### getWechat().router.redirect(path,options)

    push 页面
    router.redirectTo和另外1个功能一致，为了照顾个人习惯写了另外1个别名:redirect

参数 :

- path: string  page的路径，绝对或相对路径

- options: JSON格式的数据 例如：{a: 1, b: 2};，此数据会拼接到path（path?a=1&b=2）后面，在onLoad的入参options中捕获

## navigateBack —— 返回
### getWechat().router.navigateBack(delta)
### getWechat().router.back(delta)

    返回 页面
    router.navigateBack和另外1个功能一致，为了照顾个人习惯写了另外1个别名:back

参数 :

- delta: 返回的页面层数，缺省默认未1

## reLaunch —— 重启
### getWechat().router.reLaunch(path, options)

    重启到某个页面

参数 :

- path: string  page的路径，绝对或相对路径

- options: JSON格式的数据 例如：{a: 1, b: 2};，此数据会拼接到path（path?a=1&b=2）后面，在onLoad的入参options中捕获

## 跨页面传Object对象
### withKGData(obj)

    函数: withKGData(obj)
    向目标页面传递obj，为了保护数据不受污染，传到下一个页面的obj将被深拷贝，所以在目标页面操作obj不用担心前一个页面的数据收到影响

使用

在当前页面使用

pages/index/index.js

``

    import { getWechat } from "killglobal";
    const BasePage = getWechat().page;
    const Router = getWechat().router;
    Page(BasePage({
        data:{},
        gotoTargetPage(data){
            const _obj = {a:1};
            Router.navigateTo('/pages/target/index').withKGData(_obj);
            // Router.redirectTo().withKGData(obj);
            // Router.reLaunch().withKGData(obj);
            // Router.navigateBack().withKGData(obj);
        },
    }))

``

在目标页面接收

pages/target/index.js

``

    import { getWechat } from "killglobal";
    const BasePage = getWechat().page;
    Page(BasePage({
        data:{},
        onKGData(data){
            console.log(params);
            // 执行结果: {a:1}
        },
    }))

``

## 跳转前获取目标页面实例 —— onPage
### onPage(page=>{})

    函数: onPage(page=>{})


使用

在当前页面使用

pages/index/index.js

``

    import { getWechat } from "killglobal";
    const BasePage = getWechat().page;
    const Router = getWechat().router;
    Page(BasePage({
        data:{},
        gotoTargetPage(data){
            Router.navigateTo('/pages/target/index').onPage(page=>{
                page.showAlert();
                // 打印结果: I'm target!
            });
            // Router.redirectTo().onPage(page=>{});
            // Router.reLaunch().onPage(page=>{});
            // Router.navigateBack().onPage(page=>{});
        },
    }))

``

目标页面

pages/target/index.js

``

    import { getWechat } from "killglobal";
    const BasePage = getWechat().page;
    Page(BasePage({
        data:{},
        showAlert(){
            console.log("I'm target!")
        },
    }))

``



## v1.3.0

提供针对跳转目标page对象实例获取：
``
router.push('/pages/index').onPage(page=>{
    console.log('跳转目标page的实例：', page);
})
``

## v1.2.32

参数错误提示

## v1.2.31

修复递归调用的 deepcopy 问题

## v1.2.3

修复抛出问题

## v1.2.2

添加 readme 文件

## v1.2.1

将 withKGData 的数据进行深拷贝，解决空数组和对象没有被拷贝的 bug
