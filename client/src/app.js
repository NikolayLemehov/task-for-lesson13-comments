/**
 * Created by IlyaLitvinov on 10.04.17.
 */
import {CommentsController} from "./components/comments/comments.controller";
import './styles.styl';

/*
import { Comments } from "./components/comments/comments";

const comments1 = new Comments('.comment-container');
comments1.init();*/

const list = new CommentsController('.comment-container');