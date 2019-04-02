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

export { unary, identity, constant, spreadArgs, gatherArgs, partial };
