import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getMember } from '@/db/index';

const handler = nc();

handler.use(all);

handler.get(async (req, res) => {
  const member = await getMember(
    req.db,
    req.query.q ? req.query.q : undefined,
    req.query.limit ? req.query.limit : undefined
  );
  res.send({ member });
});

export default handler;
