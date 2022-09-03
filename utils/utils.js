function judgeIsObject(data) {
    return typeof data === 'object' && data !== null;
}

function judgeIsUndefinedOrNull(data) {
    return typeof data === 'undefined' || data === null;
}

function judgeIsUndefined(data) {
    return typeof data === 'undefined';
}

function judgeIsFunction(data) {
    return typeof data === 'function';
}

const selfReturnFunc = function(val) {
    return function(args) {
        if (judgeIsUndefined(val) && !judgeIsUndefined(args)) {
            return args || '';
        }
        return judgeIsFunction(val) ? val.bind(this) : val;
    }
}

const valueReturnFunc = function(value) {
    return function(args) {
        return value.value;
    }
}

export {
    judgeIsObject,
    judgeIsUndefinedOrNull,
    judgeIsUndefined,
    judgeIsFunction,
    selfReturnFunc,
    valueReturnFunc
}