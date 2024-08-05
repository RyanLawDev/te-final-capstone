package com.techelevator.dao;

import com.techelevator.model.Band;

import java.util.List;

public interface BandDao {

    List<Band> fetchAllBands();

    public Band fetchBandByBandId(int bandId);

    public Band addBand(Band newBand);

    public Band updateBand(Band updatedBand);

    public void deleteBand(int bandId);


}
