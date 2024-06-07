import {signalify} from './ngx-signalify';
import {of, Subject, throwError} from 'rxjs';
import {TestBed} from '@angular/core/testing';



describe("nx-signalify tests", () => {

  it("should work with a basic Observable", () => {
    TestBed.runInInjectionContext(() => {
      const signalState = signalify(of(21));
      expect(signalState.data()).toBe(21);
      expect(signalState.loading()).toBe(false);
      expect(signalState.error()).toBe(undefined);
    });
  });

  it("should work when errors are thrown", () => {
    TestBed.runInInjectionContext(() => {
      const signalState = signalify(throwError(() => new Error("bam")));
      expect(signalState.data()).toBe(undefined);
      expect(signalState.loading()).toBe(false);
      expect(signalState.error()?.message).toBe("bam");
    });
  });

  it("should have a proper loading state", () => {
    TestBed.runInInjectionContext(() => {
      const subject = new Subject<number>()
      const signalState = signalify(subject);
      expect(signalState.data()).toBe(undefined);
      expect(signalState.loading()).toBe(true);
      expect(signalState.error()).toBe(undefined);
      subject.next(42);
      expect(signalState.data()).toBe(42);
      expect(signalState.loading()).toBe(false);
      expect(signalState.error()).toBe(undefined);
    });
  });
})
