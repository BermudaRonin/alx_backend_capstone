import { useState } from "react"
import * as classNames from '../../classnames'

interface Props {

}

export default function RegisterForm(props: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    return <form className={classNames.form.root}>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Username</label>
            <input className={classNames.form.input} value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Password</label>
            <input className={classNames.form.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Repeat password</label>
            <input className={classNames.form.input} type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        </div>
        <div className={classNames.form.actions}>
            <button className={classNames.form.reset} type="reset">Reset</button>
            <button className={classNames.form.submit} type="submit">Register</button>
        </div>
    </form>
}