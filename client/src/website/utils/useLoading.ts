import { useState } from "react";

enum State {
    IDLE = "idle",
    PENDING = "pending",
    REJECTED = "rejected",
    FULFILLED = "fulfilled"
}

const useLoading = () => {
    const [state, setState] = useState(State.IDLE);
    return {
        State,
        isLoading: state === State.PENDING,
        startLoading: () => setState(State.PENDING),
        stopLoading: (success : boolean) => success ? setState(State.FULFILLED) : setState(State.REJECTED),
        resetLoading: () => setState(State.IDLE)
    }
}

export default useLoading