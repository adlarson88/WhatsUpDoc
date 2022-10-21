package com.WhatsUpDoc.PhDTracker.Services.Repositories;

import com.WhatsUpDoc.PhDTracker.Services.DBFields.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

    @Override
    boolean existsById(String s);

}
