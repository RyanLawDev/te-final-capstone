package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Follow;
import com.techelevator.model.Notification;
import com.techelevator.model.User;
import org.springframework.data.relational.core.sql.Not;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;


@Component
@CrossOrigin
public class JdbcNotificationDao implements NotificationDao{

    private final JdbcTemplate jdbcTemplate;

    public JdbcNotificationDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @Override
    public Notification addNotification(Notification notification) {

        String sql = "INSERT INTO notifications (spotify_band_id, message) " +
                "VALUES (?, ?)" +
                "RETURNING notification_id";

        int newId = jdbcTemplate.queryForObject(sql, int.class, notification.getBandId(), notification.getMessage());
        notification.setNotificationId(newId);



        return notification;
    }

    @Override
    public List<Notification> getListOfNotifications(List<Follow> follows, int userId) {
        List<Notification> notifications = new ArrayList<>();
        String sql = "SELECT * FROM notifications WHERE spotify_band_id = ?";
        if (!follows.isEmpty()) {
            for (Follow follow : follows) {
                try {
                    SqlRowSet results = jdbcTemplate.queryForRowSet(sql, follow.getBandId());
                    List<Notification> readNotifications = getAllRemovedNotifications(userId);
                    boolean isFound = false;
                    while(results.next()) {
                        Notification notification = mapRowToNotification(results);
                        for (Notification readNotification : readNotifications) {
                            if (notification.getNotificationId() == readNotification.getNotificationId()) {
                                isFound = true;
                                break;
                            }
                        }
                        if (!isFound) {
                            notifications.add(notification);
                        }
                    }
                } catch (CannotGetJdbcConnectionException e) {
                    throw new DaoException("Unable to connect to server or database", e);
                }
            }

        }
        return notifications;
    }

    @Override
    public String getBandIdByUserId(int userId) {
        String bandId = "";
        String sql = "SELECT band_id FROM adminuser_band WHERE user_id = ?";
        try {
            SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
            if (results.next()) {
                bandId = results.getString("band_id");
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to server or database", e);
        }
        return bandId;
    }

    @Override
    public List<Notification> removeNotification(Notification notification, int userId) {
        String sql = "INSERT INTO read_notifications (notification_id, user_id) VALUES (?, ?)";
        jdbcTemplate.queryForObject(sql, int.class, notification.getNotificationId(), userId);

        return getAllRemovedNotifications(userId);

    }

    @Override
    public List<Notification> getAllRemovedNotifications(int userId) {
        List<Notification> notifications = new ArrayList<>();
        String sql = "SELECT * FROM read_notifications WHERE user_id = ?";
                try {
                    SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userId);
                    while(results.next()) {
                        Notification notification = mapRowToNotification(results);
                        notifications.add(notification);
                    }
                } catch (CannotGetJdbcConnectionException e) {
                    throw new DaoException("Unable to connect to server or database", e);
                }

        return notifications;
    }


    private Notification mapRowToNotification(SqlRowSet rs) {
        Notification notification = new Notification();
        notification.setNotificationId(rs.getInt("notification_id"));
        notification.setBandId(rs.getString("spotify_band_id"));
        notification.setMessage(rs.getString("message"));
        return notification;
    }
}
