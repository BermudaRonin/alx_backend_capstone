import { useState } from "react"
import * as classNames from '../../website/classnames'
import * as actions from '../../api/actions'
import { useAuth } from "../hooks";
import { TokenResponse } from "../../api/types";
import useLoading from "../../website/utils/useLoading";
import useValues from "../../website/utils/useValues";

interface Values {
    username: string;
    password: string;
    password2: string;
    errorMessage: string;
}

export default function RegisterForm() {
    const { login } = useAuth()
    const { isLoading, startLoading, stopLoading, resetLoading: resetLoading } = useLoading();
    const { setValue, resetValues, values, value } = useValues<Values>({
        username: "",
        password: "",
        password2: "",
        errorMessage: ""
    })

    function onError(msg: string) {
        setValue('errorMessage', msg);
        stopLoading(false);
    }
    function onSuccess(tokenResponse: TokenResponse) {
        login(tokenResponse);
        stopLoading(true);
    }
    function onReset() {
        resetLoading();
        resetValues();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startLoading();

        const { password, password2, username } = values
        if (password !== password2) return onError("Passwords do not match");
        const response = await actions.registerUser({ username, password });
        if ('error' in response) return onError(response.error);
        return onSuccess(response);
    }

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onReset()
    }


    return <form className={classNames.form.root} onReset={handleReset} onSubmit={handleSubmit}>
        {value('errorMessage') && <div className={[classNames.form.row, classNames.form.error].join(" ")}>
            {value('errorMessage')}
        </div>}
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Username</label>
            <input className={classNames.form.input} value={value("username")} onChange={(e) => setValue('username', e.target.value)} />
        </div>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Password</label>
            <input className={classNames.form.input} type="password" value={value("password")} onChange={(e) => setValue('password', e.target.value)} />
        </div>
        <div className={classNames.form.row}>
            <label className={classNames.form.label}>Repeat password</label>
            <input className={classNames.form.input} type="password" value={value("password2")} onChange={(e) => setValue('password2', e.target.value)} />
        </div>
        <div className={classNames.form.actions}>
            <button className={classNames.form.reset} type="reset">Reset</button>
            <button className={classNames.form.submit} type="submit">Register</button>
        </div>
    </form>
}