package com.telegroupltd.planning_vacation_app.repository;

import com.telegroupltd.planning_vacation_app.model.Notification;
import com.telegroupltd.planning_vacation_app.repository.genericRepository.HasActiveRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer>, HasActiveRepository<Notification,Integer> {
    Notification getById(Integer id);
    List<Notification> getAllByCompanyIdAndActive(Integer companyId, byte active);
    List<Notification> getAllByReceiverUserIdAndActive(Integer receiverUserId, byte active);
    List<Notification> getAllByReceiverUserIdAndActiveAndSeen(Integer receiverUserId, byte active, byte seen);
}

