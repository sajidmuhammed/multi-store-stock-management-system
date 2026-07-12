#design - api

Design

Data Model

Three collections:


Product — name, sku (product catalog, store-independent).
Store — name, location (physical/logical store locations).
Stock — the join between the two: productId (ref → Product), storeId (ref → Store), quantity (number, never negative), plus timestamps.

here the stock tracked per store, so same product can be in multiple stores with diff quantities

prevent negative stocks in concurrent ereq situations :

  decrementing stock not following a read then write pattern .
  coz it leads to a concurrent req issue-> race condition.

  -> to solve this the decriment is a single mongodb atomic operation , so it will be atomic

  Stock.findOneAndUpdate(
  { productId, storeId, quantity: { $gte: amount } },
  { $inc: { quantity: -amount } }
)

MongoDB evaluates the filter and applies the $inc as one indivisible operation at the storage engine level. If another request has already dropped quantity below amount between two calls, the filter simply never matches and find OneAndUpdate returns null, which the service treats as insuficient stock. There is no window where two concurrent requests can both see enough stock and both succeed in over drafting it. This holds regardless of how many requests arrive simultaneously.

Increments (+change, and the credit side of a transfer) use $inc with upsert: true, which is likewise atomic and safe to run concurrently.

Making Transfers Atomic :

A transfer is two writes to two different documents (debit source, credit destination), which a single findOneAndUpdate can't cover on its own. This is wrapped in a MongoDB multi-document transaction (mongoose.startSession() + startTransaction()):


Debit the source store using the same atomic $gte-guarded findOneAndUpdate described above, inside the session.
Credit the destination store ($inc, upsert) inside the same session.
commitTransaction() only if both succeed.
Any failure (insufficient stock, missing product/store, a transient write conflict) triggers abortTransaction(), which rolls back the debit — the source is never left short without a matching credit landing on the destination.


This guarantees the transfer is all-or-nothing: from any other reader's perspective, either both sides of the transfer are visible, or neither is.

