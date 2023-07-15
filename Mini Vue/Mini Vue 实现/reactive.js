/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-14 14:16
 * @LastAuthor : itchaox
 * @LastTime   : 2023-07-15 13:17
 * @desc       : 响应式基本处理
 */

// FIXME: 实现自动收集依赖

class Dep {
  constructor() {
    // 存储依赖的容器
    this.subscribers = new Set();
  }

  // 收集依赖
  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect);
    }
  }

  // 数据修改时，执行副作用
  notify() {
    this.subscribers.forEach((effect) => effect());
  }
}

let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

// Map key 为 string
// WeakMap key 为 对象，弱引用，方便垃圾回收

function getDep(target, key) {
  const targetMap = new WeakMap();
  let depsMap = targetMap.get(target);

  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }

  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

// Vue2 实现数据劫持
function reactive(raw) {
  Object.keys(raw).forEach((key) => {
    const dep = getDep(raw, key);
    let value = raw[key];

    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return value;
      },

      set(newValue) {
        if (value !== newValue) {
          value = newValue;
          dep.notify();
        }
      },
    });
  });

  return raw;
}

// Vue3 实现数据劫持
//FIXME: proxy 代理之后,没有发生响应式变化
// function reactive(raw) {
//   return new Proxy(raw, {
//     get(target, key) {
//       const dep = getDep(target, key);
//       dep.depend();
//       return target[key];
//     },
//     set(target, key, newValue) {
//       const dep = getDep(target, key);
//       target[key] = newValue;
//       dep.notify();
//     },
//   });
// }

const info = reactive({
  age: 18,
  name: 'xxx',
});

watchEffect(function () {
  // 依赖 info.age
  console.log('test1', info.age * 2);
});

watchEffect(function () {
  // 依赖 info.age
  console.log('test2', info.age * info.age);
});

watchEffect(function () {
  console.log(info.name);
});

info.name = 'ttt';
info.age = 123;
info.age = 777;
