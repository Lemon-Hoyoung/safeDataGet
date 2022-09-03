import { judgeIsFunction, judgeIsObject, judgeIsUndefined, judgeIsUndefinedOrNull, selfReturnFunc, valueReturnFunc } from './utils.js';

function safeData(data) {
    let isObject = judgeIsObject(data);
    let isUndefinedOrNull = judgeIsUndefinedOrNull(data);

    let generateProxyObject = function(data) {
        let dataWrapper = isObject ? data : isUndefinedOrNull ? selfReturnFunc({value: data}) : selfReturnFunc(data)
        let currentIsFunction = judgeIsFunction(data);
        if (currentIsFunction) {
          dataWrapper = (isObject || isUndefinedOrNull) ? data : selfReturnFunc(data);
        }
        return new Proxy(dataWrapper, {
            get: function (target, prop) {
                let val;
                let currentThis;
                if (judgeIsFunction(target) && isObject) {
                    val = target['props'][prop];
                    currentThis = target['props'];
                } else if (isUndefinedOrNull) {
                    val = target();
                    currentThis = target;
                } else {
                    val = isObject ? target[prop]:target();
                    currentThis = target;
                }
  
                let func = (isObject) ? selfReturnFunc(val).bind(currentThis) : isUndefinedOrNull ? valueReturnFunc(val) : val;
                if (currentIsFunction) {
                  func = (isObject) ? selfReturnFunc(val).bind(currentThis) : isUndefinedOrNull ? selfReturnFunc(val).bind(currentThis) : val;
                }
                func['props'] = !judgeIsUndefined(val) ? val : {};
                return generateProxyObject(func);
            }
        });
    }

    return generateProxyObject(data)
}

export default safeData;