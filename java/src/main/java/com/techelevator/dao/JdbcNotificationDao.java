package com.techelevator.dao;

import com.techelevator.exception.DaoException;
import com.techelevator.model.Follow;
import com.techelevator.model.Notification;
import org.springframework.data.relational.core.sql.Not;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@Component
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
    public List<Notification> getListOfNotifications(List<Follow> follows) {
        List<Notification> notifications = new ArrayList<>();
        String sql = "SELECT * FROM notifications WHERE spotify_band_id = ?";
        if (!follows.isEmpty()) {
            for (Follow follow : follows) {
                try {
                    SqlRowSet results = jdbcTemplate.queryForRowSet(sql, follow.getBandId());
                    while(results.next()) {
                        Notification notification = mapRowToNotification(results);
                        notifications.add(notification);
                    }
                } catch (CannotGetJdbcConnectionException e) {
                    throw new DaoException("Unable to connect to server or database", e);
                }
            }

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
