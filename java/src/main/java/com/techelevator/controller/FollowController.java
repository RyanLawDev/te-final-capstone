package com.techelevator.controller;

import com.techelevator.dao.BandDao;
import com.techelevator.dao.FollowDao;
import com.techelevator.dao.UserDao;
import com.techelevator.model.Band;
import com.techelevator.model.Follow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class FollowController {

    @Autowired
    private FollowDao followDao;
    @Autowired
    private UserDao userDao;

    public Follow newFollow;


    @RequestMapping(path = "/follows", method= RequestMethod.GET)
    public List<Follow> fetchAllFollows(Principal principal) {
        int userId = userDao.getUserByUsername(principal.getName()).getId();
        return followDao.getFollows(userId);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/follows", method= RequestMethod.POST)
    public Follow addNewFollow(@Valid @RequestBody String bandId, Principal principal) {

        newFollow.setBandId(bandId);
        newFollow.setUserId(userDao.getUserByUsername(principal.getName()).getId());
        return followDao.createFollow(newFollow);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @RequestMapping(path = "/follows/{id}", method= RequestMethod.DELETE)
    public void deleteFollow(@PathVariable int followId) {
        followDao.deleteFollow(followId);
    }




}
