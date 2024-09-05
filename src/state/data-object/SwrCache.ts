// import { Arrays, isDefined } from "@mjtdev/engine";
// import type { DataObject } from "ai-worker-common";
// import type { State } from "swr";

// type CacheValue = State<Readonly<DataObject[]>>;
// type CacheKey = string;

// export interface CacheEntry {
//   key: CacheKey;
//   value: CacheValue;
//   ref: WeakRef<CacheValue>;
// }

// export class SwrCache {
//   private cacheMap: WeakMap<object, CacheEntry> = new WeakMap();
//   private keyMap: Map<CacheKey, object> = new Map();
//   private finalizationRegistry: FinalizationRegistry<CacheKey>;

//   constructor(private notifyOnEviction: (key: CacheKey) => void) {
//     this.finalizationRegistry = new FinalizationRegistry((key) => {
//       this.keyMap.delete(key);
//       this.notifyOnEviction(key);
//     });
//   }

//   private createRef(value: CacheKey): WeakRef<CacheKey> {
//     return new WeakRef(value);
//   }
//   dump() {
//     console.log("------- cache map -----");
//     console.log(this.cacheMap);
//     console.log("------- key map -----");
//     console.log(this.keyMap);
//   }

//   keys(): string[] {
//     return Arrays.from(this.keyMap.keys());
//   }

//   entries(): [CacheKey, CacheValue][] {
//     const keys = this.keys();
//     return keys
//       .map((key) => [key, this.get(key)] as [CacheKey, CacheValue])
//       .filter((entry) => isDefined(entry[0]) && isDefined(entry[1]));
//   }

//   set(key: CacheKey, value: CacheValue): void {
//     const cacheKey = {};
//     const ref = this.createRef(key);
//     const entry: CacheEntry = { key, value, ref };
//     this.cacheMap.set(cacheKey, entry);
//     this.keyMap.set(key, cacheKey);
//     this.finalizationRegistry.register(cacheKey, key, cacheKey);
//   }

//   get(key: CacheKey): CacheValue | undefined {
//     const cacheKey = this.keyMap.get(key);
//     if (!cacheKey) return undefined;

//     const entry = this.cacheMap.get(cacheKey);
//     if (!entry) return undefined;

//     const refValue = entry.ref.deref();
//     if (refValue) {
//       return refValue;
//     } else {
//       this.cacheMap.delete(cacheKey);
//       this.keyMap.delete(key);
//       this.finalizationRegistry.unregister(cacheKey);
//       this.notifyOnEviction(key);
//     }

//     return undefined;
//   }

//   delete(key: CacheKey): void {
//     const cacheKey = this.keyMap.get(key);
//     if (!cacheKey) return;

//     this.cacheMap.delete(cacheKey);
//     this.keyMap.delete(key);
//     this.finalizationRegistry.unregister(cacheKey);
//     this.notifyOnEviction(key);
//   }
// }

// // // Example usage
// // const notifyServer = (key: string) => {
// //     console.log(`Server notified to forget key: ${key}`);
// //     // Implement server notification logic here
// // };

// // const cache = new CustomCache(notifyServer);

// // // Adding to the cache
// // cache.set('query1', [{ data: 'example1' }]);
// // cache.set('query2', [{ data: 'example2' }]);

// // // Retrieving from the cache
// // console.log(cache.get('query1')); // Output: [{ data: 'example1' }]

// // // Deleting from the cache
// // cache.delete('query1');
