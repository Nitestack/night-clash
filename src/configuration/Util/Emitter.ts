export interface ConstantsEvents {
    MAXED_FOR_VILLAGE: [maxedFor: number],
    RESET: []
};

type Awaitable<T> = T | PromiseLike<T>;

/**
 * Utility class to initialize custom events
 * @author Tymianek#2403
 * @link https://discord.com/channels/@me/679268091665973258
 */
export default class Emitter {
    static handlers: { [x: string]: any; } = {};
    static on<K extends keyof ConstantsEvents>(eventName: K, handler: (...args: ConstantsEvents[K]) => Awaitable<void>) {
        if (!this.handlers[eventName]) this.handlers[eventName] = [];
        this.handlers[eventName].push(handler);
    };
    static off<K extends keyof ConstantsEvents>(eventName: K) {
        if (!this.handlers[eventName]) this.handlers[eventName] = [];
        delete this.handlers[eventName];
    };
    static emit<K extends keyof ConstantsEvents>(eventName: K, ...args: ConstantsEvents[K]) {
        for (const key in this.handlers) if (Object.hasOwnProperty.call(this.handlers, key)) {
            const handles = this.handlers[key];
            for (const hkey in handles) if (Object.hasOwnProperty.call(handles, hkey)) {
                const handle = handles[hkey];
                if (key == eventName) handle(...args);
            };
        };
    };
};