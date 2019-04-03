function unary(fn) {
  return function onlyOneArg(arg) {
    return fn(arg);
  };
}

function identity(v) {
  return v;
}

function constant(v) {
  return function value() {
    return v;
  };
}

function spreadArgs(fn) {
  return function spreadFn(args) {
    return fn(...args);
  };
}

function gatherArgs(fn) {
  return function gatherFn(...args) {
    return fn(args);
  };
}

function partial(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function reverseArgs(fn) {
  return function argsReversed(...args) {
    return fn(...args.reverse());
  };
}

function partialRight(fn, ...presetArgs) {
  return function partiallyApplied(...laterArgs) {
    return fn(...laterArgs, ...presetArgs);
  };
}

function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

function looseCurry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function looseCurried(...nextArgs) {
      var args = [...prevArgs, ...nextArgs];

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}

function uncurry(fn) {
  return function uncurried(...args) {
    var ret = fn;

    for (let arg of args) {
      ret = ret(arg);
    }

    return ret;
  };
}

function partialProps(fn, presetArgsObj) {
  return function partiallyApplied(laterArgsObj) {
    return fn({...presetArgsObj, ...laterArgsObj});
  };
}

function curryProps(fn, arity = 1) {
  return (function nextCurried(prevArgsObj) {
    return function curried(nextArgObj = {}) {
      var [firstKey] = Object.keys(nextArgObj);
      var allArgsObj = { ...prevArgsObj, [firstKey]: nextArgObj[firstKey] };

      if (Object.keys(allArgsObj).length >= arity) {
        return fn(allArgsObj);
      } else {
        return nextCurried(allArgsObj);
      }
    };
  })({});
}

function not(predicate) {
  return function negated(...args) {
    return !predicate(...args);
  };
}

function when(predicate, fn) {
  return function conditional(...args) {
    if (predicate(...args)) {
      return fn(...args);
    }
  };
}

export {
  unary,
  identity,
  constant,
  spreadArgs,
  gatherArgs,
  partial,
  reverseArgs,
  partialRight,
  curry,
  looseCurry,
  uncurry,
  partialProps,
  curryProps,
  not,
  when,
};
