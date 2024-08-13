# NgxSignalify (for Angular)

To install: `npm install ngx-signalify`

Then, turn any `Observable` into a `SignalState` object with information about:
- Are we still loading data?
- What's the current data?
- Did any error happen?

Example in your component Typescript code:
```javascript
  import { signalify } from 'ngx-signalify'; 

  http = inject(HttpClient);
  comments = signalify(this.http.get(URL));
```
HTML template:
```angular17html
 @if(comments.loading()) {
      Loading comments...
 } @else {
    We have {{comments.data()?.length}} comments
 }
 @if (comments.error()) {
      Something went wrong!
 }
```

The `SignalState` object has 3  properties - `loading`, `data`, and `error` - all Angular signals:
```typescript
export interface SignalState<T> {
  loading: Signal<boolean>;
  data: Signal<T | undefined>;
  error: Signal<Error | undefined>;
}
```

And that's it! You can `signalify` any `Observable` into a `SignalState` object.

Live example: https://stackblitz.com/edit/ngx-signalify-demo
