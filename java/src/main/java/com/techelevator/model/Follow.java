package com.techelevator.model;

public class Follow {

    private int id;

    private String mbid;

    private int userId;

    public Follow() {
    }

    public Follow(int id, String mbid, int userId) {
        this.id = id;
        this.mbid = mbid;
        this.userId = userId;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMbid() {
        return mbid;
    }

    public void setMbid(String mbid) {
        this.mbid = mbid;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}




