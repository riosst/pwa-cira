import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const user = await User.find({});

                res.status(200).json({ users: user })
            } catch (error) {
                res.status(400).json({ users: '' });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}