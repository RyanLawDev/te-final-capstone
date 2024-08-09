package com.techelevator.model;

public class Follow {

    private int id;

    private String bandId;

    private int userId;

    public Follow() {
    }

    public Follow(int id, String bandId, int userId) {
        this.id = id;
        this.bandId = bandId;
        this.userId = userId;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getBandId() {
        return bandId;
    }

    public void setBandId(String bandId) {
        this.bandId = bandId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}




