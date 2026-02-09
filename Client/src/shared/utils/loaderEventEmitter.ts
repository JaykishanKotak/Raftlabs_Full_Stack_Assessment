// src/shared/utils/loaderEventEmitter.ts
// Simple event emitter for loader events

type LoaderEvent = 'startLoader' | 'stopLoader';

type Listener = () => void;

class LoaderEventEmitter {
  private listeners: Record<LoaderEvent, Listener[]> = {
    startLoader: [],
    stopLoader: [],
  };

  on(event: LoaderEvent, listener: Listener) {
    this.listeners[event].push(listener);
    return () => this.off(event, listener);
  }

  off(event: LoaderEvent, listener: Listener) {
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
  }

  emit(event: LoaderEvent) {
    this.listeners[event].forEach((listener) => listener());
  }
}

const loaderEventEmitter = new LoaderEventEmitter();
export default loaderEventEmitter;
