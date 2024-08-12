package com.techelevator.dao;

import com.techelevator.model.Follow;
import com.techelevator.model.Notification;
import org.springframework.data.relational.core.sql.Not;

import java.util.List;

public interface NotificationDao {

    Notification addNotification(Notification notification);

    List<Notification> getListOfNotifications(List<Follow> follows);

}
