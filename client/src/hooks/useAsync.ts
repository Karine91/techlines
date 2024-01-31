import * as React from "react";
export type Status = "idle" | "pending" | "resolved" | "rejected";

function useSafeDispatch<T>(dispatch: React.Dispatch<T>) {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  return React.useCallback(
    (arg: T) => (mounted.current ? dispatch(arg) : void 0),
    [dispatch]
  );
}

const defaultInitialState: InitState = { status: "idle", error: null };
interface InitState {
  status: Status;
  error: null | string;
}

function useAsync(initialState: InitState) {
  const initialStateRef = React.useRef<InitState>({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, error }, setState] = React.useReducer(
    (s: InitState, a: Partial<InitState>) => ({ ...s, ...a }),
    initialStateRef.current
  );

  const safeSetState = useSafeDispatch(setState);

  const setError = React.useCallback(
    (error: InitState["error"]) => safeSetState({ error, status: "rejected" }),
    [safeSetState]
  );
  const reset = React.useCallback(
    () => safeSetState(initialStateRef.current),
    [safeSetState]
  );

  const run = React.useCallback(
    <T>(promise: Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: "pending" });
      return promise.then(
        (data: T) => {
          return data;
        },
        (error) => {
          setError(error);
          return Promise.reject(error);
        }
      );
    },
    [safeSetState, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    setError,
    error,
    status,

    run,
    reset,
  };
}

export { useAsync };
