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
        String sql = "SELECT spotify_band_id FROM follows WHERE user_id = ?";
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
    @Override
    public Follow createFollow(Follow newFollow){
        String sql = "INSERT INTO follows (user_id, spotify_band_id) " +
                "VALUES(?, ?) " +
                "RETURNING follow_id";
        int newId = jdbcTemplate.queryForObject(sql, int.class, newFollow.getUserId(), newFollow.getBandId());
        newFollow.setId(newId);

        return newFollow;

    }
    @Override
    public void deleteFollow(int followId){
        String sql = "DELETE FROM follows WHERE follow_id = ?";

        jdbcTemplate.update(sql, followId);

    }

    private Follow mapRowToFollow(SqlRowSet rs) {
        Follow follow = new Follow();
        follow.setId(rs.getInt("follow_id"));
        follow.setUserId(rs.getInt("user_id"));
        follow.setBandId(rs.getString("spotify_band_id"));
        return follow;
    }

}
