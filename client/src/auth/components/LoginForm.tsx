import * as classNames from '../../website/classnames'
import * as actions from '../../api/actions'
import { useAuth } from "../hooks";
import { TokenResponse } from "../../api/types";
import useLoading from "../../website/utils/useLoader";
import useValue from "../../website/utils/useValue";
import { FormInputRow } from '../../website/ui/Form';



export default function RegisterForm() {
    const defaultValue = {
        username: "",
        password: "",
        msg: ""
    }
    const value = useValue<typeof defaultValue>(defaultValue);

    const { login } = useAuth()
    const { isLoading, startLoading, stopLoading, resetLoading } = useLoading();

    function onError(msg: string) {
        value.set('msg', msg);
        stopLoading(false);
    }
    function onSuccess(tokenResponse: TokenResponse) {
        login(tokenResponse);
        stopLoading(true);
    }
    function onReset() {
        resetLoading();
        value.reset();
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startLoading();
        const response = await actions.loginUser(value.get('username', 'password'));
        if ('error' in response) return onError(response.error);
        return onSuccess(response);
    }

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onReset()
    }

    return <form className={classNames.form.root} onReset={handleReset} onSubmit={handleSubmit}>
        {value.get('msg') && <div className={[classNames.form.row, classNames.form.error].join(" ")}>{value.get('msg')}</div>}

        <FormInputRow label="Username" name="username" value={value} />
        <FormInputRow label="Password" name="password" value={value} />
        <div className={classNames.form.actions}>
            <button className={classNames.form.reset} type="reset">Reset</button>
            <button className={classNames.form.submit} type="submit">Register</button>
        </div>
    </form>
}