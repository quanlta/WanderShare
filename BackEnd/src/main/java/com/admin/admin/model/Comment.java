package com.admin.admin.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "timeshare_comment")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String userid;
    private Long timeshareitemid;
    private LocalDateTime commentdate;
    private String content;

    public Comment(String userid, Long timeshareItemId, LocalDateTime commentDate, String content) {
        this.userid = userid;
        this.timeshareitemid = timeshareItemId;
        this.commentdate = commentDate;
        this.content = content;
    }
}
