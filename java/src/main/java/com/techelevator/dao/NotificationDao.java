package com.techelevator.dao;

import com.techelevator.model.Follow;
import com.techelevator.model.Notification;
import org.springframework.data.relational.core.sql.Not;

import java.util.List;

public interface NotificationDao {

    Notification addNotification(Notification notification);

    List<Notification> getListOfNotifications(List<Follow> follows, int userId);

    String getBandIdByUserId(int userId);

    List<Notification> removeNotification(Notification notification, int userId);

    List<Notification> getAllRemovedNotifications(int userId);
}
