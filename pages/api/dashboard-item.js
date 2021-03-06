import nc from 'next-connect';
import { all } from '@/middlewares/index';
import { getDashboardItems, insertPost } from '@/db/index';

const handler = nc();

handler.use(all);

const maxAge = 1 * 24 * 60 * 60;

handler.get(async (req, res) => {
  const dashboard_items = await getDashboardItems(
    req.db,
    req.query.limit ? parseInt(req.query.limit) : undefined,
    req.query.from ? parseInt(req.query.from) : undefined
  );

  if (req.query.from && dashboard_items.length > 0) {
    // This is safe to cache because from defines
    //  a concrete range of posts
    res.setHeader('cache-control', `public, max-age=${maxAge}`);
  }

  res.send({ dashboard_items });
});

handler.post(async (req, res) => {
  if (!req.user) {
    return res.status(401).send('unauthenticated');
  }

  if (!req.body.content) return res.status(400).send('You must write something');

  const post = await insertPost(req.db, {
    content: req.body.content,
    creatorId: req.user._id,
  });

  return res.json({ post });
});

export default handler;
