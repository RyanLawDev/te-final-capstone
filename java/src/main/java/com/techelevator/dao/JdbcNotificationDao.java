package com.techelevator.dao;

import com.techelevator.model.Notification;
import org.springframework.jdbc.core.JdbcTemplate;

public class JdbcNotificationDao implements NotificationDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcNotificationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Notification addNotification(Notification notification) {

        String sql = "INSERT INTO notifications (spotify_band_id, message) " +
                "VALUES (testband, 'Message succuess')" +
                "RETURNING notification_id";

        int newId = jdbcTemplate.queryForObject(sql, int.class, notification.getBandId(), notification.getMessage());
        notification.setNotificationId(newId);



        return notification;
    }
}
