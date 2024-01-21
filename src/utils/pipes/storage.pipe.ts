const PREFIX_STORAGE_KEY = 'prefix-persist:';

class LocalStorageHandler {
    // Get data from local storage
    static get(key: string) {
        try {
            const serializedData = localStorage.getItem(PREFIX_STORAGE_KEY + key);
            return serializedData ? JSON.parse(serializedData) : null;
        } catch (error) {
            console.error("Error getting data from local storage:", error);
            return null;
        }
    }

    // Set data in local storage
    static set(key: string, data: any) {
        try {
            const serializedData = JSON.stringify(data);
            localStorage.setItem(PREFIX_STORAGE_KEY + key, serializedData);
        } catch (error) {
            console.error("Error setting data in local storage:", error);
            return null;
        }
    }

    // Remove data from local storage
    static remove(key: string) {
        try {
            localStorage.removeItem(PREFIX_STORAGE_KEY + key);
        } catch (error) {
            console.error("Error removing data from local storage:", error);
            return null;
        }
    }

    static async clear(...rest: string[]) {
        try {
            for await (const key of rest) {
                localStorage.removeItem(PREFIX_STORAGE_KEY + key);
            }
        } catch (error) {
            console.error("Error removing all item data from local storage of key:", error);
            return null;
        }
    }
}

export { LocalStorageHandler };