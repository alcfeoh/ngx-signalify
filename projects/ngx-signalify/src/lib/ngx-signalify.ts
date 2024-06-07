import {signal, Signal} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';


export interface SignalState<T> {
  loading: Signal<boolean>;
  data: Signal<T | undefined>;
  error: Signal<Error | undefined>;
}

export function signalify<T>(observable: Observable<T>): SignalState<T> {
  const loading = signal<boolean>(true);
  const error = signal<Error | undefined>(undefined);
  const obs = observable.pipe(
    tap({
      next: () => loading.set(false),
      complete: () => loading.set(false)
    }),
    catchError(err => {
      loading.set(false);
      error.set(err);
      return of(undefined);
    }),
  );
  const data = toSignal(obs);

  return {
    data, loading: loading.asReadonly(), error: error.asReadonly()
  };
}
