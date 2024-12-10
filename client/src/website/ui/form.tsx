import { twMerge } from "tailwind-merge"
import useValue from "../utils/useValue"

const common = {
    button: "py-3 px-3.5 cursor-pointer rounded-md",
}
export const classNames = {
    root: "flex flex-col gap-4 p-2",
    error: "text-red-500 text-sm ",
    actions: "flex justify-end gap-2 pt-4",
    submit: twMerge(common.button, "bg-[var(--accent)] flex-1"),
    reset: twMerge(common.button, "bg-[var(--muted)]"),
    // New
    row: "flex flex-col gap-2",
    // Form row
    label: "font-bold uppercase text-xs text-[var(--muted)]",
    input: "bg-white/25 py-2.5 px-2 rounded",
}


export function FormInputRow<ValueType>(props: {
    label: string;
    name: keyof ValueType; // Name must be a valid key of ValueType
    value: {
        get: (key: keyof ValueType) => ValueType[keyof ValueType];
        set: (key: keyof ValueType, value: ValueType[keyof ValueType]) => void;
    };
}) {
    return (
        <div className="row">
            <label>{props.label}</label>
            <input
                value={props.value.get(props.name) as string} // Ensure it's string-compatible
                onChange={(e) => props.value.set(props.name, e.target.value as ValueType[typeof props.name])}
            />
        </div>
    );
}


export function FormErrorRow() {

}

export function FormActionsRow() {
    // return <div className={classNames.form.actions}>
    //     <button className={classNames.form.reset} type="reset">Reset</button>
    //     <button className={classNames.form.submit} type="submit">Register</button>
    // </div>
}
