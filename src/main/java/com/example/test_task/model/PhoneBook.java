package com.example.test_task.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Table(schema = "phonebook_schema", name = "phonebook")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PhoneBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;

    private String phoneNumber;

    @UpdateTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

}
