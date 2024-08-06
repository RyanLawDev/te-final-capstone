package com.techelevator.controller;

import com.techelevator.dao.BandDao;
import com.techelevator.dao.FollowDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Band;
import com.techelevator.model.Follow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
public class FollowController {

    @Autowired
    private FollowDao followDao;
    private UserDao userDao;


    @RequestMapping(path = "/users/{id}/follows", method= RequestMethod.GET)
    public List<Follow> fetchAllFollows(Principal principal) {
        int userId = userDao.getUserByUsername(principal.getName()).getId();
        return followDao.getFollows(userId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/users/{id}/follows", method= RequestMethod.POST)
    public Follow addNewFollow(@Valid @RequestBody Follow newFollow) {
        return followDao.createFollow(newFollow);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(path = "/users/{id}/follows/{id}", method= RequestMethod.DELETE)
    public void deleteFollow(@PathVariable int followId) {
        followDao.deleteFollow(followId);
    }




}
