export class PostsDB {
  private dbName = 'postsDatabase';
  private version = 1;
  private db: IDBDatabase | null = null;

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains('posts')) {
          const store = db.createObjectStore('posts', { keyPath: 'profileUrl' });
          store.createIndex('timestamp', 'timestamp', { unique: false });
        }
      };
    });
  }

  async savePosts(profileUrl: string, posts: any[]) {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['posts'], 'readwrite');
      const store = transaction.objectStore('posts');

      const data = {
        profileUrl,
        posts,
        timestamp: Date.now()
      };

      const request = store.put(data);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getPosts(profileUrl: string) {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['posts'], 'readonly');
      const store = transaction.objectStore('posts');
      const request = store.get(profileUrl);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const data = request.result;
        if (!data) return resolve(null);

        // Check if cache is older than 1 hour
        if (Date.now() - data.timestamp > 60 * 60 * 1000) {
          this.deletePosts(profileUrl);
          resolve(null);
        } else {
          resolve(data.posts);
        }
      };
    });
  }

  async deletePosts(profileUrl: string) {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['posts'], 'readwrite');
      const store = transaction.objectStore('posts');
      const request = store.delete(profileUrl);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async clearAll() {
    if (!this.db) await this.initDB();

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['posts'], 'readwrite');
      const store = transaction.objectStore('posts');
      const request = store.clear();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }
}

export const postsDB = new PostsDB();
