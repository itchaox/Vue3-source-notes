/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-14 14:16
 * @LastAuthor : wangchao
 * @LastTime   : 2023-07-14 14:35
 * @desc       : 响应式基本处理
 */

/**
 * 核心思想：一个函数对某个数据有依赖时，这将此函数放入一个容器中，当依赖的数据发生修改时，这执行对应的副作用函数
 * 当前代码痛点：1. 函数依赖某个数据时，不能自动进行依赖收集 2. 当依赖的数据发生修改的时候，不能自动调用对应的副作用函数
 */

class Dep {
  constructor() {
    // 存储依赖的容器
    this.subscribers = new Set();
  }

  // 收集依赖
  addEffect(effect) {
    this.subscribers.add(effect);
  }

  // 数据修改时，执行副作用
  notify() {
    this.subscribers.forEach((effect) => effect());
  }
}

const dep = new Dep();

const info = {
  age: 18,
};

function fn1() {
  // 依赖 info.age
  console.log(info.age * 2);
}

fn1();
dep.addEffect(fn1);

function fn2() {
  // 依赖 info.age
  console.log(info.age * info.age);
}

fn2();
dep.addEffect(fn2);

info.age = 200;
dep.notify();
