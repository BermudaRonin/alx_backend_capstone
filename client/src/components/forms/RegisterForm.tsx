import { useState } from "react"
import * as classNames from '../../classnames'
import * as actions from '../server/actions'


enum State {
    IDLE = "idle",
    PENDING = "pending",
    REJECTED = "rejected",
    FULFILLED = "fulfilled"
}
interface Value {
    username: string;
    password: string;
    password2: string;
    errorMessage: string;
}

export default function RegisterForm() {
    const [state, setState] = useState(State.IDLE);
    const [value, setValue] = useState<Value>({
        username: "",
        password: "",
        password2: "",
        errorMessage: ""
    })
    const updateValue = (k : keyof Value, v: string) => setValue({ ...value, [k]: v });

    function onError(errorMessage?: string) {
        setState(State.REJECTED);
        errorMessage && setValue({ ...value, errorMessage });
    }

    function onSuccess() {
        setState(State.FULFILLED);
        setValue({ ...value, errorMessage: "" });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { password, password2, username } = value
        setState(State.PENDING);
        if (password !== password2) return onError("Passwords do not match");
        const response = await actions.registerUser({ username, password });
        if (response.error) return onError(response.error);
        onSuccess();
    }

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState(State.IDLE);
        setValue({ username: "", password: "", password2: "", errorMessage: "" });
    }


    return <form className={classNames.form.root} onReset={handleReset} onSubmit={handleSubmit}>
        {value.errorMessage && <div className={[classNames.form.row, classNames.form.error].join(" ")}>
            {value.errorMessage}
        </div>}
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Username</label>
            <input className={classNames.form.input} value={value.username} onChange={(e) => updateValue('username',e.target.value)} />
        </div>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Password</label>
            <input className={classNames.form.input} type="password" value={value.password} onChange={(e) => updateValue('password',e.target.value)} />
        </div>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Repeat password</label>
            <input className={classNames.form.input} type="password" value={value.password2} onChange={(e) => updateValue('password2',e.target.value)} />
        </div>
        <div className={classNames.form.actions}>
            <button className={classNames.form.reset} type="reset">Reset</button>
            <button className={classNames.form.submit} type="submit">Register</button>
        </div>
    </form>
}