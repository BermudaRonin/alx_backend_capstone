import { useState } from "react";

const useValues = <T>(initialValues: T) => {
    const [values, setValues] = useState<T>(initialValues);

    return { 
        setValue: (key: keyof T, value: string) => setValues({ ...values, [key]: value }),
        resetValue: (key: keyof T) => setValues({ ...values, [key]: initialValues[key] }),
        resetValues: () => setValues(initialValues),
        values: values,
        value: (key: keyof T) => values[key]
    }
}

export default useValues