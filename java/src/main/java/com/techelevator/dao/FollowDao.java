package com.techelevator.dao;

import com.techelevator.model.Follow;

import java.util.List;

public interface FollowDao {

    List<Follow> getFollows(int userId);

    Follow createFollow(Follow newFollow);

    void deleteFollow(int followId);

}
