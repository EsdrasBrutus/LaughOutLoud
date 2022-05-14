import React from "react";
import { useDispatch } from "react-redux";
import {
	deletePost,
	setCurrentId,
	likePost,
} from "../../../state/actions/postActions";
import { showModal } from "../../../state/actions/modalActions";
import { useNavigate } from "react-router-dom";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	Button,
	ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import frame from "../../../images/logo.png";

import moment from "moment";

import useStyles from "./styles";

const Post = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleEdit = () => {
		dispatch(setCurrentId(post._id));
		dispatch(showModal());
	};
	const user = JSON.parse(localStorage.getItem("profile"));

	const openPost = () => {
		navigate(`/posts/${post._id}`);
	};

	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				(like) => like === (user?.result?.googleId || user?.result?._id)
			) ? (
				<>
					<ThumbUpAltIcon fontSize="small" />
					&nbsp;
					{post.likes.length}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize="small" />
					&nbsp;{post.likes.length}
				</>
			);
		}

		return (
			<>
				<ThumbUpAltOutlined fontSize="small" />
				&nbsp;
			</>
		);
	};

	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase
				component="span"
				name="test"
				className={classes.cardAction}
				onClick={openPost}
			>
				<div>
					<CardMedia
						className={classes.media}
						image={post.selectedFile ? post.selectedFile : frame}
						title={post.title}
					/>
					<div className={classes.overlay}>
						<Typography variant="h6">{post.name}</Typography>
						<Typography variant="body2">
							{moment(post.createdAt).fromNow()}
						</Typography>
					</div>
					<div className={classes.overlay2}>
						{(user?.result?.googleId === post?.creator ||
							user?.result?._id === post?.creator) && (
							<Button
								style={{ color: "white" }}
								size="small"
								onClick={() => {
									handleEdit();
								}}
							>
								<MoreHorizIcon fontSize="medium" />
							</Button>
						)}
					</div>
					<div className={classes.details}>
						<Typography variant="body2">
							{post.tags.map((tag) => `#${tag}`)}
						</Typography>
					</div>
					<Typography className={classes.title} variant="h5">
						{post.title}
					</Typography>
					<CardContent>
						<Typography
							className={classes.title}
							variant="body2"
							color="textSecondary"
							component="p"
						>
							{post.message}
						</Typography>
					</CardContent>
				</div>
			</ButtonBase>

			<CardActions className={classes.cardActions}>
				<Button
					size="small"
					color="primary"
					disabled={!user?.result}
					onClick={() => {
						dispatch(likePost(post._id));
					}}
				>
					<Likes />
				</Button>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size="small"
						color="secondary"
						onClick={() => {
							dispatch(deletePost(post._id));
							navigate("/");
						}}
					>
						<DeleteIcon fontSize="small" />
						Delete
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
