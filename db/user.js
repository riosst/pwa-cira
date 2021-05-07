import { nanoid } from 'nanoid';

export async function findUserById(db, userId) {
  return db.collection('users').findOne({
    _id: userId,
  }).then((user) => user || null);
}

export async function findUserByPhone(db, phone) {
  // email = normalizeEmail(email);
  return db.collection('users').findOne({
    phone,
  }).then((user) => user || null);
}

export async function updateUserById(db, id, update) {
  return db.collection('users').findOneAndUpdate(
    { _id: id },
    { $set: update },
    { returnOriginal: false }, 
  ).then(({ value }) => value);
}

export async function insertUser(db, {
  phone, password, call_name, name, birthdate, kecamatan, desa, role
}) {
  return db
    .collection('users')
    .insertOne({
      _id: nanoid(12),
      phone,
      password,
      name,
      call_name,
      birthdate,
      kecamatan,
      desa,
      role
    })
    .then(({ ops }) => ops[0]);
}
