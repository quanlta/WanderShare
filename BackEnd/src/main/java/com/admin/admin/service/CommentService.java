package com.admin.admin.service;


import com.admin.admin.model.Comment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {
    List<Comment> getCommentByTimeshare(Long id);
    boolean addComment(Comment comment);
    List<Comment> getAll();
    boolean deleteComment(Long id);
}
