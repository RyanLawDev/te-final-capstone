package com.techelevator.dao;

import com.techelevator.model.Follow;
import com.techelevator.exception.DaoException;
import com.techelevator.model.Band;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Component
public class JdbcFollowDao implements FollowDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcFollowDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Follow> getFollows(int userId){
        List<Follow> follows = new ArrayList<>();
        String sql = "SELECT mbid FROM follows WHERE user_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            while(results.next()) {
                Follow follow = mapRowToFollow(results);
                follows.add(follow);
            }

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return follows;
    }

    public Follow createFollow(int userId, String mbid){

    }

    public void deleteFollow(int userId, String mbid){

    }

    private Follow mapRowToFollow(SqlRowSet rs) {
        Follow follow = new Follow();
        follow.setId(rs.getInt("follow_id"));
        follow.setUserId(rs.getInt("user_id"));
        follow.setMbid(rs.getString("mbid"));
        return follow;
    }

}
