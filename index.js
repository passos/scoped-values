class ValueObject {
  constructor(value) {
    this.value = value;
  }

  let(fn) {
    if (typeof fn !== "function") {
      return this;
    }
    return this.value !== null && this.value !== undefined ? ProxyValueObject(fn?.(this.value)) : this;
  }

  run(fn) {
    this.value !== null && this.value !== undefined && fn?.(this.value);
  }

  also(fn) {
    this.value !== null && this.value !== undefined && fn?.(this.value);
    return ProxyValueObject(this.value);
  }
}

const handler = {
  get(target, propKey) {
    if (['let', 'run', 'also', 'value'].includes(propKey)) {
      if (typeof target[propKey] === 'function') {
        return function (...args) {
          const result = target[propKey].apply(target, args);
          return result instanceof ValueObject ? ProxyValueObject(result.value) : result;
        };
      }
      return target[propKey];
    }

    const valueProperty = target.value[propKey];
    if (typeof valueProperty === 'function') {
      return function (...args) {
        const result = valueProperty.apply(target.value, args);
        return ProxyValueObject(result);
      };
    }
    return ProxyValueObject(valueProperty);
  }
};

const ProxyValueObject = (value) => new Proxy(new ValueObject(value), handler);

export default ProxyValueObject;