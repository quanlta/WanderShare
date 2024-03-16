package com.admin.admin.repository;


import com.admin.admin.model.Role;
import com.admin.admin.model.Users;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceContexts;
import org.hibernate.Session;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.stereotype.Repository;

import javax.xml.transform.Transformer;
import java.util.List;

@Repository
public class RoleCustomRepo {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Role> getRole(Users user){
        StringBuilder sql = new StringBuilder()
                .append("select r.name from users u\n" +
                        "join user_role ur on u.user_id = ur.user_id\n" +
                        "join roles r on r.id = ur.role_id\n" +
                        "Where 1=1");
        if(user.getEmail() != null){
            sql.append(" and email=:email");
        }
        NativeQuery<Role> query = ((Session)entityManager.getDelegate()).createNativeQuery(sql.toString());
        if(user.getEmail() != null){
            query.setParameter("email", user.getEmail());
        }
        query.addScalar("name", StandardBasicTypes.STRING);
        query.setResultTransformer(Transformers.aliasToBean(Role.class));
        return query.list();
    }

}
