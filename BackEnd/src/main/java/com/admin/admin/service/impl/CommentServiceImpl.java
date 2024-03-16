package com.admin.admin.service.impl;

import com.admin.admin.model.Comment;
import com.admin.admin.repository.CommentRepository;
import com.admin.admin.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    @Override
    public List<Comment> getCommentByTimeshare(Long id) {
        return commentRepository.findCommentByTimeshareitemid(id);
    }

    @Override
    public boolean addComment(Comment comment) {
        try {
            comment.setCommentdate(LocalDateTime.now());
            commentRepository.save(comment);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    @Override
    public List<Comment> getAll() {
        return commentRepository.findAll();
    }

    @Override
    public boolean deleteComment(Long id) {
        try {
            commentRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }

    }
}
