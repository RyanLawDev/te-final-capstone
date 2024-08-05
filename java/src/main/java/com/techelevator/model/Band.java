package com.techelevator.model;

public class Band {

    private int id;

    private String mbId;

    private String name;

    private String[] members;

    private String description;

    private String[] imageUrls;

    private String[] genres;

    private String[] socials;


    public int getId() {
        return id;
    }

    public String getMbId() {
        return mbId;
    }

    public void setMbId(String mbId) {
        this.mbId = mbId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getMembers() {
        return members;
    }

    public void setMembers(String[] members) {
        this.members = members;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String[] getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String[] imageUrls) {
        this.imageUrls = imageUrls;
    }

    public String[] getGenres() {
        return genres;
    }

    public void setGenres(String[] genres) {
        this.genres = genres;
    }

    public String[] getSocials() {
        return socials;
    }

    public void setSocials(String[] socials) {
        this.socials = socials;
    }
}
