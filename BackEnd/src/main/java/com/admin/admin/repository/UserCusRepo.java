package com.admin.admin.repository;

import com.admin.admin.model.UsersRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserCusRepo {
    @PersistenceContext
    private EntityManager entityManager;

    public List<UsersRequest> findAllUsers(){
        StringBuilder sql = new StringBuilder()
                .append("select users.user_id,users.username,users.email,users.phone,users.is_excuted,users.status,users.balance  from users");
        NativeQuery<UsersRequest> query = ((Session)entityManager.getDelegate()).createNativeQuery(sql.toString());
        query.addScalar("user_id", StandardBasicTypes.STRING);
        query.addScalar("username", StandardBasicTypes.STRING);
        query.addScalar("email", StandardBasicTypes.STRING);
        query.addScalar("phone", StandardBasicTypes.STRING);
        query.addScalar("is_excuted", StandardBasicTypes.BOOLEAN);
        query.addScalar("status", StandardBasicTypes.INTEGER);
        query.addScalar("balance", StandardBasicTypes.DOUBLE);
        query.setResultTransformer(Transformers.aliasToBean(UsersRequest.class));
        return query.list();
    }

    public List<UsersRequest> findUserById(String email){
        StringBuilder sql = new StringBuilder()
                .append("select users.user_id,users.username,users.email,users.phone,users.is_excuted,users.balance from users where users.user_id = '" + email+"'");
        NativeQuery<UsersRequest> query = ((Session)entityManager.getDelegate()).createNativeQuery(sql.toString());
        query.addScalar("user_id", StandardBasicTypes.STRING);
        query.addScalar("username", StandardBasicTypes.STRING);
        query.addScalar("email", StandardBasicTypes.STRING);
        query.addScalar("phone", StandardBasicTypes.STRING);
        query.addScalar("is_excuted", StandardBasicTypes.BOOLEAN);
        query.addScalar("balance", StandardBasicTypes.DOUBLE);
        query.setResultTransformer(Transformers.aliasToBean(UsersRequest.class));
        return query.list();
    }
}
