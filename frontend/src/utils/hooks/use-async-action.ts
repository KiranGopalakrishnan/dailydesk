import { useEffect, useState } from 'react';
// This is needed as an initial extends for T since the incoming function can return anything and take in any arguments
// But the actual type of the function will be inferred from at compile time based on the async function passed to the hook
/* eslint-disable @typescript-eslint/no-explicit-any */
type ActionFn = (...args: any) => any;
// Unwrap the promise to get the actual result type of ActionFn
// Effectively extracts TypeA from Promise<TypeA>
type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type ResultHandler<T> = (arg: T) => void;
// OnSuccess handler should receive the result value as the param
// Awaited<ReturnType<T>> makes sure that if a onSuccess is registered ,
// the return type is inferred from the async action this hook is executing
type OnSuccess<T extends ActionFn> = ResultHandler<Awaited<ReturnType<T>>>;
type OnError = ResultHandler<Error>;
// parameter for register and unregister options
type RegisterOption = 'onError' | 'onSuccess';
// Method overloads for register function
interface RegisterFn<T extends ActionFn> {
  // onSuccess register
  (registerOption: RegisterOption, fn: OnSuccess<T>): void;
  // onError register
  (registerOption: RegisterOption, fn: OnError): void;
}
// Properly extract parameter types from the async function
type ExecutableAsyncFn<T extends ActionFn> = (...args: Parameters<T>) => void;
interface AsyncActionReturnType<T extends ActionFn> {
  isLoading: boolean;
  result: Awaited<ReturnType<T>> | null;
  error: Error | null;
  deferred: [
    ExecutableAsyncFn<T>,
    (registerOption: RegisterOption, fn: OnSuccess<T> | OnError) => void,
    (registerOption: RegisterOption, fn: OnSuccess<T> | OnError) => void
  ];
}
// Callback stacks are defined as maps specifically because they allow us to set functions as keys
// Which makes unregistering or re-registration of a handler easy
// Map is based on reference equality so if the function being registered does not match an existing reference it will be added to the stack
const successCallbackStack = new Map<ActionFn, RegisterOption>();
const errorCallbackMap = new Map<ActionFn, RegisterOption>();
const registerSuccess = <T extends ActionFn>(fn: OnSuccess<T>): void => {
  successCallbackStack.set(fn, 'onSuccess');
};
const registerError = (fn: OnError): void => {
  errorCallbackMap.set(fn, 'onError');
};
const unregisterSuccess = <T extends ActionFn>(fn: OnSuccess<T>): void => {
  successCallbackStack.delete(fn);
};
const unregisterError = (fn: OnError): void => {
  errorCallbackMap.delete(fn);
};

export const useAsyncAction = <T extends ActionFn>(action: T): AsyncActionReturnType<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<T>> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const executable = async (...args: Parameters<T>): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await action(...args);
      setResult(result);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Register and unregister is modelled after the native JS event handler registration methods addEventListener & removeEventListener
   */
  const register: RegisterFn<T> = (
    registerOption: RegisterOption,
    fn: OnSuccess<T> | OnError
  ): void => {
    if (registerOption === 'onSuccess') registerSuccess(fn);
    registerError(fn as OnError);
  };
  const unregister: RegisterFn<T> = (
    registerOption: RegisterOption,
    fn: OnSuccess<T> | OnError
  ): void => {
    if (registerOption === 'onSuccess') unregisterSuccess(fn);
    unregisterError(fn as OnError);
  };

  useEffect(() => {
    if (!result) return;
    // Call each registered onSuccess fn in call order
    successCallbackStack.forEach((_value, fn) => fn(result));
  }, [result]);

  useEffect(() => {
    if (!result) return;
    // Call each registered onError fns in call order
    errorCallbackMap.forEach((_value, fn) => fn(result));
  }, [error]);

  // Purely for syntax sugar purposes , so that these functions can be renamed appropriately by the consumer of this hook
  const deferred: AsyncActionReturnType<T>['deferred'] = [executable, register, unregister];
  return { isLoading, result, error, deferred };
};
