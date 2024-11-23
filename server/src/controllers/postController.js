const Post = require('../models/postModel');
const { notifyAll, notifyOne } = require('../services/notifications/notify');


const uploadPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const userId = req.user.id;

        const images = req.files['images'] ? req.files['images'].map(file => `/uploads/${file.filename}`) : [];
        const docs = req.files['docs'] ? req.files['docs'].map(file => `/uploads/${file.filename}`) : [];
        const video = req.files['video'] ? `/uploads/${req.files['video'][0].filename}` : null;

        const post = new Post({
            author: userId,
            title,
            description,
            images,
            docs,
            video
        });

        await post.save();

        await notifyAll(userId, post._id);

        return res.status(201).json({ message: 'Post uploaded successfully!' });

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error!' })
    }
}

const editPost = async (req, res) => {
    try {
        const { postId, title, description } = req.body;
        let editedData = {};

        if (title) editedData.title = title;
        if (description) editedData.description = description;
        if (req.files['images']) editedData.images = req.files['images'].map(file => `/uploads/${file.filename}`);
        if (req.files['docs']) editedData.docs = req.files['docs'].map(file => `/uploads/${file.filename}`);
        if (req.files['video']) editedData.video = `/uploads/${req.files['video'][0].filename}`;

        const post = await Post.findByIdAndUpdate(postId, editedData, { new: true });

        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ error: 'Could not edit the post!' })
    }
}

const deletePost = async (req, res) => {
    const { postId } = req.body;

    try {
        await Post.deleteOne({ _id: postId });

        return res.status(201).json({ message: "Post deleted successfully!" })

    } catch (error) {
        return res.status(500).json({ error: "Post is not deleted successfully!" });
    }
}



const changePostStatus = async (req, res) => {
    try {
        const { postId, status } = req.body;

        await Post.findOneAndUpdate({ _id: postId }, { status })

        return res.status(201).json({ message: "Post status is changed successfully!" })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



const getFeedPosts = async (req, res) => {
    try {
        const start = req.query.start || 0;
        const count = req.query.count || 10;
        const allPosts = await Post.find({ status: 'active' })
            .skip(start)
            .limit(count)
            .populate('author')
            .populate({
                path: 'comments',
                populate: [
                    { path: 'author' },
                    {
                        path: 'replies',
                        populate: { path: 'author' }
                    }
                ]
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({ posts: allPosts });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while fetching posts!' })
    }
}


const getUserPosts = async (req, res) => {
    try {
        const start = req.query.start || 0;
        const count = req.query.count || 10;
        const { userId } = req.params;
        const userPosts = await Post.find({ status: 'active', author: userId })
            .skip(start)
            .limit(count)
            .populate('author')
            .populate({
                path: 'comments',
                populate: [
                    { path: 'author' },
                    {
                        path: 'replies',
                        populate: { path: 'author' }
                    }
                ]
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({ posts: userPosts });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while fetching posts!' })
    }
}


const getMyPosts = async (req, res) => {
    try {
        const start = req.query.start || 0;
        const count = req.query.count || 10;
        const userId = req.user.id;
        const myPosts = await Post.find({ status: 'active', author: userId })
            .skip(start)
            .limit(count)
            .populate('author')
            .populate({
                path: 'comments',
                populate: [
                    { path: 'author' },
                    {
                        path: 'replies',
                        populate: { path: 'author' }
                    }
                ]
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({ posts: myPosts });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while fetching posts!' })
    }
}



const getAllPosts = async (req, res) => {
    try {
        const start = req.query.start || 0;
        const count = req.query.count || 10;

        const allPosts = await Post.find()
            .skip(start)
            .limit(count)
            .populate('author')
            .populate({
                path: 'comments',
                populate: [
                    { path: 'author' },
                    {
                        path: 'replies',
                        populate: { path: 'author' }
                    }
                ]
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({ posts: allPosts });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while fetching posts!' })
    }
}


const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id)
            .populate('author')
            .populate({
                path: 'comments',
                populate: [
                    { path: 'author' },
                    {
                        path: 'replies',
                        populate: { path: 'author' }
                    }
                ]
            });

        if (!post) return res.status(404).json({ error: "Post not found!" });
        if ((post.status !== 'active' && req.user.type !== 'admin') && post.author._id !== req.user.id) {
            return res.status(405).json({ error: 'Not allowed!' });
        }

        return res.status(200).json({ post });
    }
    catch (err) {
        return res.status(404).json({ error: "Post not found!" })
    }
}


const likePost = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found!' });

        if (post.likes.includes(userId)) {
            post.likes = post.likes.filter((l) => l.toString() !== userId);
        }
        else {
            post.likes.push(userId);
        }

        await post.save();

        if (userId !== post.author) await notifyOne(userId, post.author, 'like', post._id);

        return res.status(200).json({ message: 'Post like status updated successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while liking the post!' })
    }
}



const addComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, text } = req.body;
        if (!text) return res.status(400).json({ error: 'Comment cannot be empty!' });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found!' });

        const newComment = {
            author: userId,
            text: text,
            likes: [],
            replies: []
        };

        post.comments.push(newComment);
        await post.save();

        if (userId !== post.author) await notifyOne(userId, post.author, 'comment', post._id);

        return res.status(201).json({ message: 'Comment added successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Error occurred while adding the comment!' });
    }
}



const replyComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, commentId, text } = req.body;
        if (!text || !commentId) return res.status(400).json({ error: 'Reply cannot be empty!' });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found!' });

        const newReply = {
            author: userId,
            text: text,
            likes: []
        };

        comment.replies.push(newReply);

        await post.save();

        return res.status(201).json({ message: 'Reply added successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while replying the comment!' })
    }
}



const likeComment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, commentId } = req.body;
        if (!postId || !commentId) return res.status(400).json({ error: 'Something went wrong!' });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found!' });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found!' });

        if (comment.likes.includes(userId)) {
            comment.likes = comment.likes.filter((c) => c.toString() !== userId);
        }
        else {
            comment.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({ message: 'Comment liked/unliked successfully!' });
    } catch (error) {
        return res.status(500).json({ error: "Error occured while liking the comment!" });
    }
}



const likeReply = async (req, res) => {
    try {
        const userId = req.user.id;
        const { postId, commentId, replyId } = req.body;
        if (!postId || !commentId || !replyId) return res.status(400).json({ error: 'Something went wrong!' });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found!' });

        const comment = post.comments.id(commentId);
        if (!comment) return res.status(404).json({ error: 'Comment not found!' });

        const reply = comment.replies.id(replyId);
        if (!reply) return res.status(404).json({ error: 'Reply not found!' });

        if (reply.likes.includes(userId)) {
            reply.likes = reply.likes.filter((r) => r.toString() !== userId);
        }
        else {
            reply.likes.push(userId);
        }

        await post.save();

        return res.status(200).json({ message: 'Reply liked/unliked successfully!' });

    } catch (error) {
        return res.status(500).json({ error: "Error occured while liking the reply!" });
    }
}


const getMonthlyPostCounts = async (req, res) => {
    try {
        const year = req.query.year || new Date().getFullYear();

        const postCounts = await Post.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { '_id': 1 },
            },
        ]);

        const result = Array(12).fill(0); 
        postCounts.forEach(({ _id, count }) => {
            result[_id - 1] = count; 
        });

        return res.status(200).json({ year, postCounts: result });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch post counts!' });
    }
};



module.exports = {
    uploadPost,
    editPost,
    deletePost,
    changePostStatus,
    getFeedPosts,
    getAllPosts,
    getUserPosts,
    getMyPosts,
    getPost,
    likePost,
    addComment,
    replyComment,
    likeComment,
    likeReply,
    getMonthlyPostCounts
}