import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { addProduct, addStore, getCartByStoreId } from '@/db/index';

const handler = nc();
handler.use(all);

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }

  if (!req.body.product_id) return res.status(400).send('You must write something');

  const isStoreExist = await getCartByStoreId(req.db, {
    member_id: req.user._id,
    store_id: req.body.store_id
  });

  console.log(isStoreExist)

  if (!isStoreExist) {
    const post = await addStore(req.db, {
      member_id: req.user._id,
      store_id: req.body.store_id,
      product_id: req.body.product_id
    });
    return res.json({ post });
  } else {
    const post = await addProduct(req.db, {
      member_id: req.user._id,
      store_id: req.body.store_id,
      product_id: req.body.product_id
    });
    return res.json({ post });
  }
});

export default handler;
