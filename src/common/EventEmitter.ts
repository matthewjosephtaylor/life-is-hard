import { isUndefined } from "@mjtdev/engine";

type EventMap = {
  [event: string]: unknown;
};
type EventListener<K, T> = (props: { type: K; detail: T }) => void;

export class EventEmitter<Events extends EventMap> {
  private eventListeners: Map<
    keyof Events,
    Set<EventListener<keyof Events, Events[]>>
  >;

  constructor() {
    this.eventListeners = new Map();
  }

  on<K extends keyof Events>(
    event: K,
    listener: EventListener<K, Events[K]>
  ): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners
      .get(event)!
      .add(listener as EventListener<unknown, unknown>);
    return () => this.off(event, listener);
  }

  off<K extends keyof Events>(
    event: K,
    listener: EventListener<K, Events[K]>
  ): void {
    if (this.eventListeners.has(event)) {
      this.eventListeners
        .get(event)!
        .delete(listener as EventListener<unknown, unknown>);
    }
  }

  emit<K extends keyof Events>(event: K, detail: Events[K]): void {
    const listeners = this.eventListeners.get(event);
    if (isUndefined(listeners)) {
      return;
    }
    for (const listener of listeners) {
      (listener as EventListener<K, Events[K]>)({ type: event, detail });
    }
  }

  once<K extends keyof Events>(
    event: K,
    listener: EventListener<K, Events[K]>
  ): void {
    const onceListener: EventListener<K, Events[K]> = (e) => {
      listener(e);
      this.off(event, onceListener);
    };
    this.on(event, onceListener);
  }
}
