class ScopedValue {
  constructor(value) {
    this.value = value;
  }

  let(fn) {
    if (typeof fn !== "function") {
      return this;
    }
    return this.value !== null && this.value !== undefined ? ProxyScopedValue(fn?.(this.value)) : this;
  }

  run(fn) {
    this.value !== null && this.value !== undefined && fn?.(this.value);
  }

  also(fn) {
    this.value !== null && this.value !== undefined && fn?.(this.value);
    return ProxyScopedValue(this.value);
  }
}

const handler = {
  get(target, propKey) {
    if (['let', 'run', 'also', 'value'].includes(propKey)) {
      if (typeof target[propKey] === 'function') {
        return function (...args) {
          const result = target[propKey].apply(target, args);
          return result instanceof ScopedValue ? ProxyScopedValue(result.value) : result;
        };
      }
      return target[propKey];
    }

    const valueProperty = target.value[propKey];
    if (typeof valueProperty === 'function') {
      return function (...args) {
        const result = valueProperty.apply(target.value, args);
        return ProxyScopedValue(result);
      };
    }
    return ProxyScopedValue(valueProperty);
  }
};

const ProxyScopedValue = (value) => new Proxy(new ScopedValue(value), handler);

export default ProxyScopedValue;