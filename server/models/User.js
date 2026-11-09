import { storage } from '../db/storage.js';

export class User {
  static findByEmail(email) {
    return storage.findUserByEmail(email);
  }

  static findById(id) {
    return storage.findUserById(id);
  }

  static create(userData) {
    return storage.createUser(userData);
  }

  static update(id, updates) {
    return storage.updateUser(id, updates);
  }

  static delete(id) {
    return storage.deleteUser(id);
  }
}
