package com.telegroupltd.planning_vacation_app.model;

import java.util.ArrayList;

public class Leaves {

    ArrayList<LeaveRequestUserLeaveRequestStatus> leaves;
    boolean isAbsent;

    public Leaves(ArrayList<LeaveRequestUserLeaveRequestStatus> leaves, boolean isAbsent) {
        this.leaves = leaves;
        this.isAbsent = isAbsent;
    }

    public ArrayList<LeaveRequestUserLeaveRequestStatus> getLeaves() {
        return leaves;
    }

    public void setLeaves(ArrayList<LeaveRequestUserLeaveRequestStatus> leaves) {
        this.leaves = leaves;
    }

    public boolean isAbsent() {
        return isAbsent;
    }

    public void isAbsent(boolean isAbsent) {
        isAbsent = isAbsent;
    }
}
