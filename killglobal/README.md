## 使用说明：

``
npm i killglobal --save
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
