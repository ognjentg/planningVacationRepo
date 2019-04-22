package com.telegroupltd.planning_vacation_app.repository.genericRepository;


import com.telegroupltd.planning_vacation_app.common.HasActive;

import java.io.Serializable;
import java.util.List;

public interface HasActiveRepository<T extends HasActive, ID extends Serializable> {
    List<T> getAllByActiveIs(Byte active);

    T getByIdAndActive(ID id, Byte active);

    Boolean existsByIdAndActive(ID id, Byte active);
}
