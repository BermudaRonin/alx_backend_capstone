import { useState } from "react";
import Validator from "./Validator";

const useValue = <ValueType>(initialValues: ValueType) => {
    const [state, setState] = useState<ValueType>(initialValues);

    // value.get('foo') returns the value of foo
    // value.get('foo', 'bar') // returns an object of foo and bar
    // value.get() // returns the entire state
    function get<Key extends keyof ValueType>(key: Key): ValueType[Key];
    function get<Key extends keyof ValueType>(...keys: Key[]): Pick<ValueType, Key>;
    function get<Key extends keyof ValueType>(...keys: Key[]) {
        if (keys.length === 1) return state[keys[0]];
        return Object.fromEntries(keys.map((key) => [key, state[key]])) as Pick<ValueType, Key>;
    }

    // function getMany<Key extends keyof ValueType>(...args : (keyof ValueType)[]) {
    //     if (args.length === 1) return state[args[0]] as ValueType[typeof args[0]]
    // }
    const set = <Key extends keyof ValueType>(k: Key, v: ValueType[Key]) => setState({ ...state, [k]: v });
    const reset = <Key extends keyof ValueType>(k?: Key) => {
        if (k) {
            setState({ ...state, [k]: initialValues[k] });
        } else {
            setState(initialValues);
        }
    }

    // State check
    const isMatching = <Key extends keyof ValueType>(...keys: Key[]): boolean => {
        if (keys.length < 2) return true; // Single key is trivially equal to itself

        const firstValue = state[keys[0]];
        return keys.every((key) => state[key] === firstValue);
    }

    const hasValue = (k: keyof ValueType): boolean => state[k] !== undefined;
    const isInitial = (k: keyof ValueType): boolean => state[k] === initialValues[k];

    // Validation
    const isEmptyArray = <Key extends keyof ValueType>(k: Key): Boolean => new Validator(state[k]).isEmptyArray();
    const isFullArray = <Key extends keyof ValueType>(k: Key): Boolean => new Validator(state[k]).isFullArray();


    return {
        get, set, reset,
        isMatching,
        hasValue, isInitial,
        isEmptyArray, isFullArray
    };
}

export default useValue