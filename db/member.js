export async function getMember(db) {
  return db
    .collection('users')
    .find()
    // .sort({ createdAt: -1 })
    // .limit(limit || 10)
    .toArray();
}