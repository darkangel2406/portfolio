import { storage } from '../db/storage.js';

export class Transaction {
  static create(txData) {
    return storage.createTransaction(txData);
  }

  static findByOrderId(orderId) {
    return storage.findTransactionByOrderId(orderId);
  }

  static update(orderId, updates) {
    return storage.updateTransaction(orderId, updates);
  }

  static findByUserId(userId) {
    return storage.findTransactionsByUserId(userId);
  }
}
