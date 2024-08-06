package com.techelevator.controller;

import com.techelevator.dao.BandDao;
import com.techelevator.model.Band;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
public class BandController {

    private BandDao bandDao;

    @RequestMapping(path = "/bands", method= RequestMethod.GET)
    public List<Band> fetchAllBands() {
        return bandDao.fetchAllBands();
    }

    @RequestMapping(path = "/bands/{id}", method= RequestMethod.GET)
    public Band fetchBandById(@PathVariable int id) {
        Band foundBand = bandDao.fetchBandByBandId(id);
        if (foundBand == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return foundBand;
    }
}
