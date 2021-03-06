import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getProduct, findProductById } from '@/db/index';

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const product = await findProductById(
    req.db,
    req.query.id
  );

  res.send({ product });
});

export default handler;
