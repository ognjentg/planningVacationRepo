package com.telegroupltd.planning_vacation_app.model;

import java.util.ArrayList;
import java.util.List;

public class LeaveRequestExtended{

    LeaveRequest leaveRequest;
    List<LeaveRequestDate> dates =new ArrayList<>();

    public LeaveRequest getLeaveRequest() {
        return leaveRequest;
    }

    public void setLeaveRequest(LeaveRequest leaveRequest) {
        this.leaveRequest = leaveRequest;
    }

    public List<LeaveRequestDate> getDates() {
        return dates;
    }

    public void setDates(List<LeaveRequestDate> dates) {
        this.dates = dates;
    }

}
