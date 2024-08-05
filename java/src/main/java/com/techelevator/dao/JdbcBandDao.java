package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Band;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class JdbcBandDao implements BandDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcBandDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Band> fetchAllBands(){

        List<Band> bands = new ArrayList<>();

        String sql = "SELECT bands.band_id, mbid, name, description, \n" +
                "(SELECT ARRAY_AGG(person_name) FROM people\n" +
                "JOIN band_people ON band_people.person_id = people.person_id\n" +
                "JOIN bands ON band_people.band_id = bands.band_id) AS members, \n" +
                "(SELECT ARRAY_AGG(image_url) FROM images\n" +
                "JOIN bands ON images.band_id = bands.band_id) AS images, \n" +
                "(SELECT ARRAY_AGG(genre_name) FROM genres\n" +
                "JOIN band_genre ON band_genre.genre_id = genres.genre_id\n" +
                "JOIN bands ON bands.band_id = band_genre.band_id) AS genres, \n" +
                "(SELECT ARRAY_AGG(social_url)  FROM socials\n" +
                "JOIN bands ON bands.band_id = socials.band_id) AS socials \n" +
                "FROM bands\n" +
                "GROUP BY bands.band_id;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
            while  (results.next()) {
                Band band = mapRowToBand(results);

                bands.add(band);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return bands;



    }

    public Band fetchBandByBandId(int bandId){
        Band band = null;
        String sql = "SELECT bands.band_id, mbid, name, description, \n" +
                "(SELECT ARRAY_AGG(person_name) FROM people\n" +
                "JOIN band_people ON band_people.person_id = people.person_id\n" +
                "JOIN bands ON band_people.band_id = bands.band_id) AS members, \n" +
                "(SELECT ARRAY_AGG(image_url) FROM images\n" +
                "JOIN bands ON images.band_id = bands.band_id) AS images, \n" +
                "(SELECT ARRAY_AGG(genre_name) FROM genres\n" +
                "JOIN band_genre ON band_genre.genre_id = genres.genre_id\n" +
                "JOIN bands ON bands.band_id = band_genre.band_id) AS genres, \n" +
                "(SELECT ARRAY_AGG(social_url)  FROM socials\n" +
                "JOIN bands ON bands.band_id = socials.band_id) AS socials \n" +
                "FROM bands\n" +
                "WHERE bands.band_id = ?" +
                "GROUP BY bands.band_id;";

        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, bandId);

            if  (results.next()) {
                band = mapRowToBand(results);

            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return band;

    }

    public Band addBand(Band newBand){
        return newBand;
    }

    public Band updateBand(Band updatedBand){
        return updatedBand;
    }

    public void deleteBand(int bandId){
        System.out.println("Deleted band.");
    }

    private Band mapRowToBand(SqlRowSet rowSet) {
        Band band = new Band();
        band.setMbId(rowSet.getString("mbId"));
        band.setName(rowSet.getString("name"));
        band.setMembers(rowSet.getString("members").split(","));
        band.setDescription(rowSet.getString("description"));
        band.setImageUrls(rowSet.getString("imageUrls").split(","));
        band.setGenres(rowSet.getString("genres").split(","));
        band.setSocials(rowSet.getString("socials").split(","));
        return band;
    }
}
