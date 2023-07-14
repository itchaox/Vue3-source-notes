/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-14 14:16
 * @LastAuthor : wangchao
 * @LastTime   : 2023-07-14 17:13
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

function reactive(raw) {
  Object.keys(raw).forEach((key) => {
    const dep = getDep(raw, key);
    let value = raw[key];

    // Vue2 实现数据劫持
    Object.defineProperty(raw, key, {
      get() {
        dep.depend();
        return value;
      },

      set(newValue) {
        value = newValue;
        dep.notify();
      },
    });

    // Vue3 实现数据劫持
  });

  return raw;
}

let activeEffect = null;
function watchEffect(effect) {
  activeEffect = effect;
  effect();
  activeEffect = null;
}

const info = reactive({
  age: 18,
});

watchEffect(function () {
  // 依赖 info.age
  console.log(info.age * 2);
});

watchEffect(function () {
  // 依赖 info.age
  console.log(info.age * info.age);
});

info.age = 200;
