export async function getShopCategory(db, limit, from) {
  return db
    .collection('shop_category')
    .find({
      // Pagination: Fetch posts from before the input date or fetch from newest
      ...(from && {
        sort_order: {
          $gte: from,
        },
      }),
    })
    .sort({ sort_order: 1 })
    .limit(limit || 100)
    .toArray();
}

export async function findShopCategoryByCode(db, category_code) {
  return db.collection('shop_category').findOne({
    code: category_code,
  }).then((category) => category || null);
}