# 🚀 原生 js 控制 bezier 曲线

demo 访问地址：https://wklili.github.io/canvas_Interview/

## 实现贝塞尔曲线的基本控制

#### 1.canvas 内部元素与鼠标事件绑定

#### 2.动态修改控制点与 bezier

## 动态添加控制点的 label 描述

#### 1.初始化自定义注释

#### 2.可以双击点进行添加注释

#### 3.点击注释可以进行修改

## 对控制点周围的样式进行修改

#### 1.背景颜色渐变

#### 2.采用滤镜做周围样式颜色变化(采用计算圆的方式去用滤镜在周围生成样式)

## 根据屏幕的分辨率不同绘制出高清的canvas图形

#### 1.尺寸改变后导致绑定的鼠标事件需要一起变动

#### 2.绘制图形的接口需要加上ratio

#### 待完善：canvas 事件自动绑定类（现在是每添加一个元素则手动添加到观察数组中）

```
npm run build
```

or

```
yarn build
```

to bundle your application

```
npm run start
```

to start your application