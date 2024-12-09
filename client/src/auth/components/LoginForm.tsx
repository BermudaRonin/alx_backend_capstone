import { useState } from "react"
import * as classNames from '../../website/classnames'
import * as actions from '../../api/actions'
import { useAuth } from "../hooks";

enum State {
    IDLE = "idle",
    PENDING = "pending",
    REJECTED = "rejected",
    FULFILLED = "fulfilled"
}
interface Value {
    username: string;
    password: string;
    errorMessage: string;
}

export default function LoginForm() {
    const { login } = useAuth()
    const [state, setState] = useState(State.IDLE);
    const [value, setValue] = useState<Value>({
        username: "",
        password: "",
        errorMessage: ""
    })
    const updateValue = (k: keyof Value, v: string) => setValue({ ...value, [k]: v });

    function onError(errorMessage?: string) {
        setState(State.REJECTED);
        errorMessage && setValue({ ...value, errorMessage });
    }

    function onSuccess(token: string) {
        setState(State.FULFILLED);
        login(token);
        setValue({ ...value, errorMessage: "" });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { password, username } = value
        setState(State.PENDING);
        const response = await actions.loginUser({ username, password });
        if (response.error) return onError(response.error);
        const { token } = response
        onSuccess(token);
    }

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setState(State.IDLE);
        setValue({ username: "", password: "", errorMessage: "" });
    }


    return <form className={classNames.form.root} onReset={handleReset} onSubmit={handleSubmit}>
        {value.errorMessage && <div className={[classNames.form.row, classNames.form.error].join(" ")}>
            {value.errorMessage}
        </div>}
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Username</label>
            <input className={classNames.form.input} value={value.username} onChange={(e) => updateValue('username', e.target.value)} />
        </div>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Password</label>
            <input className={classNames.form.input} type="password" value={value.password} onChange={(e) => updateValue('password', e.target.value)} />
        </div>
        <div className={classNames.form.actions}>
            <button className={classNames.form.reset} type="reset">Reset</button>
            <button className={classNames.form.submit} type="submit">Login</button>
        </div>
    </form>
}